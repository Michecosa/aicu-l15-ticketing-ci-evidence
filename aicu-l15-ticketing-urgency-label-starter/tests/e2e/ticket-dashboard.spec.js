import { expect, test } from "@playwright/test";

test("shows the server-calculated urgency label in the ticket list", async ({
  page
}) => {
  await page.goto("/");

  const ticketRow = page
    .getByRole("row")
    .filter({ hasText: "Impossibile accedere al portale clienti" });
  // il locator ci racconta quali sono gli elementi (o l'elemento in particolare) che stiamo cercando.
  // attenzione: se racconta esclusivamente dove sia nel DOM (come fareste in un programma) 
  // la soluzione e' piu' fragile

  await expect(ticketRow).toContainText("prioritario");
});


test("shows the server validation error when the title is too short", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Titolo").fill("ab");
  await page.getByLabel("Cliente").fill("Alfa S.r.l.");
  await page.getByRole("radio", { name: "normale" }).check();
  await page.getByRole("radio", { name: "email" }).check();
  await page.getByRole("button", { name: "Salva ticket" }).click();

  await expect(page.getByRole("status")).toHaveText(
    "Inserisci un titolo di almeno 3 caratteri."
  );
});
