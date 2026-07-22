import { expect, test } from "@playwright/test";

const publicRoutes = [
  { name: "hub", path: "/" },
  { name: "maya", path: "/teachers/maya-torres" },
  { name: "caleb", path: "/teachers/caleb-okafor" },
  { name: "nadine", path: "/teachers/nadine-brooks" },
  { name: "register", path: "/register" },
];

const viewports = [
  { name: "phone", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 900 },
];

test.describe("Phase 0 public routes", () => {
  for (const route of publicRoutes) {
    test(`${route.name} keeps the permanent disclaimer and abuse link visible`, async ({
      page,
    }) => {
      // Given
      await page.goto(route.path);

      // When
      const disclaimer = page.getByText(
        /personal recommendation list.*not a school or district program or endorsement/i,
      );

      // Then
      await expect(disclaimer.first()).toBeVisible();
      await expect(
        page.getByRole("link", { name: /report abuse/i }),
      ).toHaveAttribute("href", /^mailto:/);
    });
  }

  test("register sticky intro never overlaps the privacy summary while scrolling", async ({
    page,
  }) => {
    // Given a short laptop viewport where the sticky intro travels furthest
    await page.setViewportSize({ width: 1280, height: 620 });
    await page.goto("/register");

    // When scrolling through the page in steps
    const total = await page.evaluate(() => document.body.scrollHeight);
    for (const fraction of [0.25, 0.5, 0.75, 1]) {
      await page.evaluate(
        (y) => window.scrollTo(0, y),
        Math.floor((total - 620) * fraction),
      );
      await page.waitForTimeout(150);

      // Then the intro's box stays above the privacy summary's box
      const intro = await page.locator(".register-intro").boundingBox();
      const privacy = await page.locator(".privacy-summary").boundingBox();
      if (intro && privacy) {
        expect(
          intro.y + intro.height,
          `intro bottom must not cross privacy top at scroll ${fraction}`,
        ).toBeLessThanOrEqual(privacy.y + 1);
      }
    }
  });

  test("teacher videos make no third-party request before an explicit click", async ({
    page,
  }) => {
    // Given
    const requests: string[] = [];
    page.on("request", (request) => requests.push(request.url()));
    await page.goto("/teachers/maya-torres");

    // When
    const requestsBeforeClick = requests.filter((url) =>
      /youtube|vimeo/i.test(url),
    );

    // Then
    expect(requestsBeforeClick).toEqual([]);
    await expect(page.locator("iframe")).toHaveCount(0);

    await page.route("https://www.youtube-nocookie.com/**", (route) =>
      route.abort(),
    );
    await page.getByRole("button", { name: /load youtube video/i }).click();
    await expect(page.locator("iframe")).toHaveAttribute(
      "src",
      /^https:\/\/www\.youtube-nocookie\.com\/embed\//,
    );
    await expect(page.locator("iframe")).not.toHaveAttribute(
      "src",
      /autoplay=1/,
    );
  });

  test("Vimeo embeds enable DNT only after an explicit click", async ({ page }) => {
    // Given
    await page.route("https://player.vimeo.com/**", (route) => route.abort());
    await page.goto("/teachers/caleb-okafor");

    // When
    await page.getByRole("button", { name: /load vimeo video/i }).click();

    // Then
    await expect(page.locator("iframe")).toHaveAttribute(
      "src",
      /^https:\/\/player\.vimeo\.com\/video\/.*\?dnt=1$/,
    );
  });

  test("scroll-reveal content remains visible with reduced motion", async ({
    page,
  }) => {
    // Given
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    // When
    const rosterCards = page.locator(".teacher-card");
    for (const card of await rosterCards.all()) {
      await card.scrollIntoViewIfNeeded();
    }

    // Then
    await expect(rosterCards).toHaveCount(3);
    for (const card of await rosterCards.all()) {
      await expect(card).toBeVisible();
    }
    const firstCard = rosterCards.first();
    const restingTransform = await firstCard.evaluate(
      (element) => getComputedStyle(element).transform,
    );
    await firstCard.hover();
    await expect
      .poll(() =>
        firstCard.evaluate((element) => getComputedStyle(element).transform),
      )
      .toBe(restingTransform);

    await page.goto("/teachers/maya-torres");
    const videoFacade = page.locator(".video-facade");
    await videoFacade.scrollIntoViewIfNeeded();
    await expect(videoFacade).toBeVisible();
  });

  test("scroll-reveal content completes normally after entering the viewport", async ({
    page,
  }) => {
    // Given
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    const finalCard = page.locator(".teacher-card").last();

    // When
    await finalCard.scrollIntoViewIfNeeded();

    // Then
    await expect(finalCard).toBeVisible();
    await expect
      .poll(() =>
        finalCard.evaluate((element) =>
          Number.parseFloat(getComputedStyle(element).opacity),
        ),
      )
      .toBeGreaterThan(0.95);
  });

  test("registration keeps entered values when server validation fails", async ({
    page,
  }) => {
    // Given
    await page.goto("/register");
    const firstName = page.locator('[name="parentFirstName"]');
    await firstName.fill("Morgan");

    // When
    await page.getByRole("button", { name: /send request/i }).click();

    // Then
    await expect(page.getByRole("alert").first()).toContainText(
      /review the highlighted fields/i,
    );
    await expect(firstName).toHaveValue("Morgan");
    await expect(page.locator('[name="parentLastName"]')).toHaveAttribute(
      "aria-describedby",
      /parentLastName-error/,
    );
  });

  test("registration preserves an explicit no-preference teacher choice", async ({
    page,
  }) => {
    // Given
    await page.goto("/register?teacher=maya-torres");
    const preferredTeacher = page.locator('[name="preferredTeacher"]');
    await expect(preferredTeacher).toHaveValue("maya-torres");
    await preferredTeacher.selectOption("");

    // When
    await page.getByRole("button", { name: /send request/i }).click();

    // Then
    await expect(page.getByRole("alert").first()).toContainText(
      /review the highlighted fields/i,
    );
    await expect(preferredTeacher).toHaveValue("");
  });

  test("registration collects only the approved minimized fields and saves", async ({
    page,
    context,
  }) => {
    // Given
    await page.goto("/register");

    // When
    const form = page.locator("form");

    // Then
    await expect(form.locator('[name="studentLastName"]')).toHaveCount(0);
    await expect(form.locator('[name="birthdate"]')).toHaveCount(0);
    await expect(form.locator('[name="school"]')).toHaveCount(0);

    await form.locator('[name="parentFirstName"]').fill("Quality");
    await form.locator('[name="parentLastName"]').fill("Assurance");
    await form.locator('[name="parentEmail"]').fill("qa.parent@example.com");
    await form.locator('[name="studentFirstName"]').fill("Emery");
    await form.locator('[name="instrument"]').selectOption("Clarinet");
    await form
      .locator('[name="experienceLevel"]')
      .selectOption("under_one_year");
    await form.locator('[name="consent"]').check();
    await form.getByRole("button", { name: /send request/i }).click();

    await expect(page.getByRole("status")).toContainText(
      /request was received/i,
    );
    expect(await context.cookies()).toEqual([]);
  });

  for (const viewport of viewports) {
    for (const route of publicRoutes) {
      test(`${route.name} renders without horizontal overflow at ${viewport.name}`, async ({
        page,
      }, testInfo) => {
        // Given
        await page.setViewportSize(viewport);
        await page.goto(route.path);

        // When
        const dimensions = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));

        // Then
        expect(dimensions.scrollWidth).toBeLessThanOrEqual(
          dimensions.clientWidth,
        );
        await page.screenshot({
          path: testInfo.outputPath(`${route.name}-${viewport.name}.png`),
          fullPage: true,
        });
      });
    }
  }
});
