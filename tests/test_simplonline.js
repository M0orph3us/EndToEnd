const { By, Builder, until } = require("selenium-webdriver");
require("dotenv").config({ path: ".env.test" });
const assert = require("assert");

(async function test_function() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://simplonline.co/login");
    await driver.manage().setTimeouts({ implicit: 500 });
    let cookie = await driver.findElement(By.className("sc-3243846d-0"));
    await cookie.click();

    let email = await driver.findElement(By.name("email"));
    let password = await driver.findElement(By.name("password"));

    await email.sendKeys("gael.moreau.simplon@gmail.com");
    await password.sendKeys(process.env.PASSWORD_SIMPLON);

    let submit = await driver.findElement(By.className("w-fit"));
    submit.click();

    let promoChoice = await driver.wait(
      until.elementLocated(By.css("[aria-label='Afficher les suggestions']"))
    );
    await promoChoice.click();

    let cdaChoicie = await driver.wait(
      until.elementLocated(
        By.xpath("//*[text()='CDA PRF Grenoble Janv24 P21']")
      )
    );
    await cdaChoicie.click();

    let brief = await driver.findElement(By.linkText("Selenium Sandbox"));
    brief.click();

    let option = await driver.wait(
      until.elementLocated(By.xpath("//*[text()='Options']"))
    );
    await option.click();

    let submitBrief = await driver.wait(
      until.elementLocated(By.css("[data-key='submitIndividualWork']"))
    );
    await submitBrief.click();

    let buttonRendu = await driver.wait(
      until.elementLocated(By.xpath("//*[text()='Soumettre un rendu']"))
    );
    await buttonRendu.click();

    let linkInput = await driver.wait(
      until.elementLocated(By.css("[placeholder='Coller votre URL ici...']")),
      5000
    );
    await linkInput.sendKeys("https://github.com/M0orph3us/EndToEnd");

    let addLinkButton = await driver.wait(
      until.elementLocated(
        By.css("[type='button'][class='sc-9f43adf8-0 egdvqs']")
      )
    );
    await addLinkButton.click();

    let inputMessage = await driver.wait(
      until.elementLocated(
        By.css("[placeholder='Envoyer un message avec le rendu...']")
      )
    );

    await inputMessage.sendKeys("Hello");

    let send = await driver.wait(
      until.elementLocated(By.className("sc-3243846d-0 eZuIYT"))
    );
    await send.click();
  } catch (e) {
    console.log(e);
  } finally {
    setInterval(function () {
      driver.quit();
    }, 20000);
  }
})();
