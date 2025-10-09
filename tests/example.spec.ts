
import { ECDH } from 'crypto';
import { test, expect } from '../Pages/fixture';

  test.describe('File download,upload ', () => {
    test('Download a txt file and validating the contents',async({ custom}) =>
        {
         await custom.Launchwebsite()
         expect(custom.Mainhead).toBeVisible();
         await custom.GotoMorepage()
         await custom.NavigatetoDownloadpage()
         expect(custom.Downloadpageheading).toBeVisible()
         await custom.Enterdataintextbox();
         await custom.GenerateDownlink();
         expect(custom.Downloadfil).toBeVisible()
         await custom.DownloadFile();

        })
      test('upload,remove and upload',async({ custom}) =>
        {
         await custom.Launchwebsite()
         expect(custom.Mainhead).toBeVisible();
         await custom.GotoMorepage()
         await custom.NavigatetoUploadpage()
         await custom.uploadFile()
        //expect(custom.UploadInput).toHaveText('info.txt')
         await custom.removeFile();
         await expect(custom.UploadInput).toHaveText('');
         await custom.uploadFile();
         await custom.submitupload();
        })
              
        test('Static Drag and drop',async({ custom}) =>
        {
          await custom.Launchwebsite()
          await custom.NavigattoInteraction()
          await custom.gotodraganddrop()
          await custom.Navigatetostatic()
          await custom.staticdraganddrop();
          const html = await custom.checkdrop.innerHTML();
          expect(html).toContain('<img');

        })
        test('dynamic Drag and drop',async({ custom}) =>
        {
          await custom.Launchwebsite()
          await custom.NavigattoInteraction()
          await custom.gotodraganddrop()
          await custom.Navigatetodynamic()
          await custom.dynamicdraganddrop();
          const html = await custom.checkdrop.innerHTML();
          expect(html).toContain('<img');

        })


        
  });

