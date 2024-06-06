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
      until.elementLocated(By.xpath('//*[@id="react-aria1829460851-145"]/svg'))
    );
    option.click();

    let submitBrief = await driver.wait(
      By.xpath("//*[@id='react-aria1829460851-94']/a")
    );

    submitBrief.click();
  } catch (e) {
    console.log(e);
  } finally {
    setInterval(function () {
      driver.quit();
    }, 20000);
  }
})();
