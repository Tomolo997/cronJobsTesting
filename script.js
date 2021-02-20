var CronJob = require('cron').CronJob;
const puppeteer = require('puppeteer');
const array = [];
var job = new CronJob(
  '*/2 * * * *',
  async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://estudij.um.si/', {
      waitUntil: 'networkidle2',
    });

    await page.type('#login_username', 'tomaz.ovsenjak@student.um.si');
    await page.type('#login_password', 'Arsenal123qwe');
    await page.keyboard.press('Enter');

    await page.waitForNavigation();

    await page.click(
      '#frontpage-course-list > div > div:nth-child(16) > div.info > h3 > a'
    );
    await page.click(
      '#module-261224 > div > div > div:nth-child(2) > div.activityinstance > a > span'
    );

    const [el] = await page.$x(
      '/html/body/div[1]/div[2]/div/div[1]/section/div[1]/table/tbody/tr/td[2]'
    );

    const reseno = await el.getProperty('textContent');
    const rawTxt = await reseno.jsonValue();

    console.log(rawTxt);
    // await page.screenshot({ path: "example.png", fullPage: true });
    await browser.close();
  },
  null,
  true,
  'America/Los_Angeles'
);
job.start();
