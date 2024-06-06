const { By, Builder, until } = require("selenium-webdriver");
const assert = require("assert");
(async function test_function() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://github.com");
    await driver.manage().setTimeouts({ implicit: 500 });

    let login = await driver.findElement(
      By.className("HeaderMenu-link--sign-in")
    );
    await login.click();
    setTimeout(() => {
      let title = driver.getTitle();
      assert(
        title === "GitHub: Let’s build from here · GitHub",
        "Test Title OK !!!"
      );
      console.log("titre", title);
    }, 2000);

    let username = await driver.findElement(By.name("login"));
    await username.sendKeys("Gael");

    let password = await driver.findElement(By.name("password"));
    await password.sendKeys("Moreau");

    let submit = await driver.findElement(By.name("commit"));
    submit.click();

    setTimeout(() => {
      let alert = driver.findElement(By.className("js-flash-alert"));
      let textAlert = alert.getText();
      assert(
        textAlert === "Incorrect username or password.",
        "Test Alert OK !!!"
      );
    }, 2000);
    await driver.manage().window().setRect({ width: 360, height: 768 });
  } catch (e) {
    console.log(e);
  } finally {
    setInterval(function () {
      driver.quit();
    }, 10000);
  }
})();
