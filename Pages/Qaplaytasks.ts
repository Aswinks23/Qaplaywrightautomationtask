import { Page, test, Locator, expect } from '@playwright/test';
import { SrvRecord } from 'dns';
import path from 'path';
import fs from 'fs';

export default class Playground
{

    readonly page:Page
    readonly Mainhead:Locator
    readonly DynamicTablelink:Locator
    readonly spidermanName:Locator
    readonly spiderealname:Locator

    readonly Verifyacclink:Locator
    readonly Verifyhead:Locator
    readonly successmesg:Locator

    readonly Tagsinput:Locator
    readonly Tagshead:Locator
    readonly Inp:Locator
    readonly countp:Locator
    readonly remov: (word: string) => Locator;
    
    readonly Newtab:Locator
    readonly opentabb:Locator
    readonly newtabHead:Locator
    

    readonly popuptab:Locator
    readonly Popup:Locator
    readonly popedupb:Locator
    readonly popmesage:Locator

    readonly iframlink:Locator
    readonly iframClickb:Locator
    readonly iframval:Locator
    

    readonly navigationmenulink:Locator
    readonly homelink:Locator
    readonly aboutlink:Locator
    readonly bloglink:Locator
    readonly portfolio:Locator
    readonly contact:Locator

    readonly Validationhead:Locator
    readonly Goback:Locator

    readonly gotoCoveredele:Locator
    readonly Coveredheadval:Locator
    readonly coveredButton:Locator

    readonly hoverimagelink:Locator
    readonly hoverimage:Locator
    readonly hoverprice:Locator


    readonly fileuploadLink:Locator
    readonly fileupld:Locator
    readonly fileupldval:Locator

    readonly budgettrackerLink:Locator
    readonly NewentryButton:Locator
    readonly Rowforentry:(id:string)=>Locator


    readonly rightclickcontentLink:Locator
    readonly contextcontent:(menu:string)=>Locator
    readonly contextVal:Locator

    readonly shadowDomLink:Locator
    readonly progressBar:Locator



    readonly ratingSlider:Locator
    readonly sliderVal:Locator


    readonly downloadFileLink:Locator


  private readonly sliderInput: Locator;
  private readonly sendFeedbackButton: Locator;



 


    constructor(page:Page)
    {
        this.page=page;
        this.Mainhead=page.locator('//span[text()="QA Playground"]')
        this.DynamicTablelink=page.locator('//h3[text()="Dynamic Table"]')
        this.spidermanName=page.locator('//div[text()="Spider-Man"]')
        this.spiderealname=page.locator('//div[text()="Spider-Man"]/ancestor::tr//span[contains(@class,"text-white-900")]')
        
        this.Verifyacclink=page.locator('//h3[text()="Verify Your Account"]')
        this.Verifyhead=page.locator('//h2[text()="Verify Your Account"]')
        this.successmesg=page.locator('//small[text()="Success"]')

        this.Tagsinput=page.locator('//h3[text()="Tags Input Box"]')
        this.Tagshead=page.locator('//h2[text()="Tags"]')
        this.Inp=page.locator('//input')
        this.countp=page.locator('//p/span')
        this.remov = (word: string) =>this.page.locator(`//li[normalize-space(text())='${word}']/i`);

        this.Newtab=page.locator('//h3[text()="New Tab"]')
        this.opentabb=page.locator('//a[text()="Open New Tab"]')
        this.newtabHead=page.locator('//h1[text()="Welcome to the new page!"]')

        this.popuptab=page.locator('//h3[text()="Pop-Up Window"]')
        this.Popup=page.locator('//a[text()="Open"]')
        this.popedupb=page.locator('//button[text()="Submit"]')
        this.popmesage=page.locator('//p[@id="info"]')

        this.iframlink=page.locator('//h3[text()="Nested Iframe"]')
        this.iframClickb=page.locator('//a[text()="Click Me"]')
        this.iframval=page.frameLocator("#frame1").frameLocator("#frame2").locator("#msg");

        this.navigationmenulink=page.locator('//h3[text()="Navigation Menu"]')
        this.homelink=page.locator('//a[text()="Home"]')
        this.aboutlink=page.locator('//a[text()="About"]')
        this.bloglink=page.locator('//a[text()="Blog"]')
        this.portfolio=page.locator('//a[text()="Portfolio"]')
        this.contact=page.locator('//a[text()="Contact"]')

        this.Validationhead=page.locator('//h1[@id="title"]')
        this.Goback=page.locator('//a[text()="Go Back"]')
        
        this.gotoCoveredele=page.locator('//h3[text()="Covered Elements"]')
        this.Coveredheadval=page.locator('//div[@class="wrapper"]/p')
        this.coveredButton=page.locator('//div[@class="wrapper"]/a')

        this.hoverimagelink=page.locator('//h3[text()="Mouse Hover"]')
        this.hoverimage=page.locator('//img[@class="poster"]')
        this.hoverprice=page.locator('//p[@class="current-price"]')


        this.fileuploadLink=page.locator('//h3[text()="Upload File"]')
        this.fileupld=page.locator('//i[@class="fas fa-upload"]')
        this.fileupldval=page.locator('//p[@id="num-of-files"]')

        this.budgettrackerLink=page.locator('//h3[text()="Budget Tracker"]')
        this.NewentryButton=page.locator('//button[text()="New Entry"]')

        this.Rowforentry=(id:String)=>page.locator(`//table[@class="budget-tracker"]/tbody/tr[${id}]`)

        this.rightclickcontentLink=page.locator('//h3[text()="Right-Click Context Menu"]')
        this.contextcontent=(menu:string)=>page.locator(`//span[text()="${menu}"]`)
        this.contextVal=page.locator('//p[@id="msg"]')

        this.shadowDomLink=page.locator('//h3[text()="Shadow DOM"]')
        this.progressBar=page.locator("progress-bar");

        this.ratingSlider=page.locator('//h3[text()="Rating Range Slider"]')
        this.sliderVal=page.locator('//p[@id="ty-msg"]')

        this.downloadFileLink=page.locator('//h3[text()="Download File"]')

        this.sendFeedbackButton = page.locator('//button[@id="feedback"]');
        this.sliderInput = page.locator('//input[@type="range"]');


        

    }

    async Launchwebsite() {
    await this.page.goto('https://qaplayground.dev/#apps');
  }
  async movetoDynamicTable()
  {
    await this.DynamicTablelink.click()
  }

  // Check for wrong superhero name
async verifyIncorrectSuperheroName(expectedName: string) {
    const actualName = await this.spiderealname.textContent();
    // Negative scenario: actual should NOT match expected
    expect(actualName?.trim()).not.toBe(expectedName);
}

// Check if superhero name is empty
async verifySuperheroNameIsEmpty() {
    const actualName = await this.spiderealname.textContent();
    expect(actualName?.trim()).not.toBe(""); // Should fail if name exists
}

// Check for partial match (name mismatch)
async verifyPartialSuperheroName(wrongPart: string) {
    const actualName = await this.spiderealname.textContent();
    expect(actualName?.includes(wrongPart)).toBeFalsy();
}

// Check for numeric or invalid characters
async verifySuperheroNameNoNumbers() {
    const actualName = await this.spiderealname.textContent();
    const regex = /\d/; // any digit
    expect(regex.test(actualName || "")).toBeFalsy();
}









  async movetoVerifyacc()
  {
    await this.Verifyacclink.click()
  }
  async enterdataNine(number:string)
  {
    const codeFields = this.page.locator(".code");
    for (let index = 0; index < (await codeFields.count()); index++) {
      codeFields.nth(index).fill(number);
      await expect(codeFields.nth(index)).toHaveValue(number);
    }
    await this.page.keyboard.press('Enter');
  
  }
  async MovetoTags()
  {
    this.Tagsinput.click()
  }

  async Enteratgs()
   {
    const newTags = [
      "vue",
      "python",
      "go",
      "react",
      "svelte",
      "tailwind",
      "linux",
      "ios",
      "android",
      "docker",
    ];
   
    for(let index=0;index<10;index++)
    {
    await this.Inp.fill(newTags[index])
    await this.Inp.click()
    await this.page.keyboard.press('Enter');
    }
   }

   async removetag(word:string)
   {
     await this.remov(word).click()
   }

   async navtonewtab()
   {
    await this.Newtab.click()
   }
   async clickonnewtab()
   {
    await this.opentabb.click()
   }

   async navgatetopop()
   {
    await this.popuptab.click()

   }

   async getpopup()
   {
    await this.Popup.click()
   }

   async popedupsubmit()
   {

    const [popup] = await Promise.all([
      await this.page.waitForEvent("popup"),
      await this.page.locator("#login").click(),
    ])
    await popup.locator("button").click() 
   }  


   async gotoiframe()
   {
    await this.iframlink.click()
   }

   async clickiframeb()
   {
    const Button= this.page.frameLocator("#frame1").frameLocator("#frame2").locator("text=Click Me");
    await Button.click()
    
   }


   async Gotonavigationmenu()
   {
    await this.navigationmenulink.click()
   }

   async gotoAbout()
   {
    await this.aboutlink.click()
   }

   async gotoBlog()
   {
    await this.bloglink.click()
   }

   async gotocontact()
   {
    await this.contact.click()
   }

   async gotoportfolio()
   {
    await this.portfolio.click()
   }

  async goBacknav()
  {
    await this.Goback.click()
  }

  async navtocoveredpage()
  {
    await this.gotoCoveredele.click()
  }
 
 async coveredButtonclick()
 {
    await this.coveredButton.click();
 }
   

 async gotoHoverimage()
 {
    this.hoverimagelink.click()
 }

 async hoveroverimage()
 {
    this.hoverimage.hover()

 }



 async fileuploadnavigation()
 {
    this.fileuploadLink.click();
 }

 async fileuploading()
 {
    const file = "Pages\\downloads\\info.txt";
    await this.page.setInputFiles("#file-input", file);
    await this.page.waitForTimeout(1000);
    const firstImageCaption = this.page.locator("#images >> figure >> nth=0 >> figcaption");
    await expect(firstImageCaption).toContainText("info.txt");

 }

 async navigatetobudgettracker()
 {
    await this.budgettrackerLink.click()
 }

 async addnewentery()
 {
    await this.NewentryButton.click()
   
 }

 async navtorightcontext()
 {
  await this.rightclickcontentLink.click()
  await this.page.waitForTimeout(500)
 }

 async rightclick()
 {
    await this.page.mouse.click(964, 258, { button: 'right' });
 }

  async MenuitemCLick(menu:string)
  {

   await this.contextcontent(menu).click()
  }


  async menuitemHover(menu:string)
  {
    await this.contextcontent(menu).hover()

  }

  async gotoshadowdom()
  {
    await this.shadowDomLink.click()
  }

  async shadowButtonClick()
  {
    await this.page.locator("button").click();

    
  }

  async navigatetoSlider()
  {
    await this.ratingSlider.click()
  }


 
async moveSliderUntilFeedbackVisible() {
    for (let value = 0; value <= 100; value++) {
      await this.sliderInput.evaluate((el, val) => {
        const input = el as HTMLInputElement;
        input.value = val.toString();
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }, value);
 
      if (await this.sendFeedbackButton.isVisible()) {
        break;
      }
    }
     await this.page.locator('#feedback').click();
  }
 

 
 






async navtodownloadfile()
{
    await this.downloadFileLink.click()
}


async downloadFile()
{

    const [download] = await Promise.all([
    this.page.waitForEvent("download"),
    this.page.locator("//a[@id='file']").click(),
  ]);

    const filePath = path.resolve(
      __dirname,
      "..",
      "testd",
      await download.suggestedFilename()
    );
    await download.saveAs(filePath);
    expect(fs.existsSync(filePath)).toBeTruthy();
    expect(path.extname(filePath)).toBe(".pdf");

}
}