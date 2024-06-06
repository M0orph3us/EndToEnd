const { By, Builder, until } = require("selenium-webdriver");
(async function test_function() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://www.google.fr");
    let title = await driver.getTitle();
    console.log("Title is:", title);

    await driver.manage().setTimeouts({ implicit: 500 });

    let refuseCookie = await driver.findElement(By.id("W0wltc"));
    await refuseCookie.click();
    let searchBox = await driver.findElement(By.name("q"));

    await searchBox.sendKeys("Selenium");
    await searchBox.submit();

    await driver.wait(until.titleContains("Selenium"), 1000);

    let newTitle = await driver.getTitle();
    console.log("New title is:", newTitle);
  } catch (e) {
    console.log(e);
  } finally {
    setInterval(function () {
      driver.quit();
    }, 15000);
  }
})();
