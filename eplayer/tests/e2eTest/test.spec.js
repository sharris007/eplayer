var assert = require('assert');
var request = require('request');

describe('LoginPage', function() {

      
    it('should let you log in', function () {  

      browser.url('/eplayer/login');

      browser.setValue('input[name="loginname"]', 'amit_qa_edu1');
      browser.setValue('input[name="password"]', 'Pa55word');
      console.log("Username and password");

      browser.submitForm('input[name="loginname"]');
      console.log("Logged in");

      browser.waitForExist('.//*[@id="bookshelf"]/div[1]/div[6]/a[1]/img', 50000);
      console.log("Book Found");

      });

    it('should click on book "Activate"', function() {


      browser.click('.//*[@id="bookshelf"]/div[1]/div[6]/a[1]/img');
      console.log("Clicked on book");

      //browser.waitForExist('.//*[@id="docViewer_ViewContainer"]/div/div[1]/div', 50000);
      browser.waitForVisible('.//*[@id="docViewer_ViewContainer"]/div/div[1]/div', 50000);
      console.log("Book loaded");
      browser.waitForVisible('.//*[@id="docViewer_ViewContainer_AnnotCanvas"]', 50000);

    });



    it('should click on TOC', function() {
      browser.waitForVisible('.//*[@id="docViewer_ViewContainer_AnnotCanvas"]', 50000);

      browser.click('.//*[@id="root"]/div/div/div/div/div/div[1]/div[1]/div[1]/div[1]/div/span');
      console.log("Clicked on TOC");

      //browser.waitForExist('.//*[@id="toc"]/div/div',5000);
      browser.waitForVisible('.//*[@id="toc"]/div/div',5000);
      console.log("contents found");
      

    });


    it('should click on Time to revise 1', function() {


      browser.click('.//*[@id="toc"]/ul/li[4]/a');
      console.log("Clicked on Time to revise 1");

      //browser.waitForExist('.//*[@id="docViewer_ViewContainer_AnnotCanvas"]', 50000);\
      browser.waitForVisible('.//*[@id="docViewer_ViewContainer_AnnotCanvas"]', 50000);
      console.log("Pagw 28 appeared");

    });

    it('should click next page', function() {


      browser.click('.//*[@id="viewer"]/div/div[5]/div/div/div[2]');
      console.log("Clicked on next page");

      //browser.waitForExist('.//*[@id="docViewer_ViewContainer_AnnotCanvas"]', 50000);
      browser.waitForVisible('.//*[@id="docViewer_ViewContainer_AnnotCanvas"]', 50000);
      console.log("Pagw 29 appeared");

    });


    it('should click on Bookmarks', function() {


      browser.click('.//*[@id="bookmarks"]');
      console.log("Clicked on bookmarks icon");

      //browser.waitForExist('.//*[@id="root"]/div/div/div/div/div/div[1]/div[1]/div[2]/div[2]/div/div[2]/div/div[2]/div/ul/li[2]/a[1]', 50000);
      browser.waitForVisible('.//*[@id="root"]/div/div/div/div/div/div[1]/div[1]/div[2]/div[2]/div/div[2]/div/div[2]/div/ul/li[2]/a[1]', 50000);
      console.log("Bookmarks found");

    });

    it('should click on Page 10 Bookmarks', function() {


      browser.click('.//*[@id="root"]/div/div/div/div/div/div[1]/div[1]/div[2]/div[2]/div/div[2]/div/div[2]/div/ul/li[2]/a[1]');
      console.log("Clicked on Page 6 bookmarks");

      //browser.waitForExist('.//*[@id="docViewer_ViewContainer_AnnotCanvas"]', 50000);
      browser.waitForVisible('.//*[@id="docViewer_ViewContainer_AnnotCanvas"]', 50000);
      console.log("Page 10 appeared");

    });

    


    it('should filter search text and give the result', function() {


      browser.click('.//*[@id="root"]/div/div/div/div/div/div[1]/div[1]/div[2]/div[1]');
      console.log("Clicked on TOC closed.");

      browser.click('.//*[@id="root"]/div/div/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div[3]');
      console.log("Clicked on search area");

      browser.waitForVisible('.//*[@id="search__box"]', 50000);



      browser.setValue('.//*[@id="search__input"]', 'good');

      browser.waitForVisible('.//*[@id="root"]/div/div/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div[4]/div/div/div[2]/div[2]/ul/ul/li[1]/div/p', 50000);
      console.log("Page 4 found");

      browser.click('.//*[@id="root"]/div/div/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div[4]/div/div/div[2]/div[2]/ul/ul/li[1]/div/p');
      console.log("Clicked on page 4");

      browser.waitForVisible('.//*[@id="docViewer_ViewContainer_AnnotCanvas"]', 50000);
      console.log("Page 4 appeared");


    });


    it('should click on Zoom Button', function() {


      browser.click('.//*[@id="root"]/div/div/div/div/div/div[1]/div[1]/div[1]/div[2]/div/span');
      console.log("Clicked on Zoom button");

      //browser.waitForExist('.//*[@id="docViewer_ViewContainer_AnnotCanvas"]', 50000);
      browser.waitForVisible('.//*[@id="root"]/div/div/div/div/div/div[1]/div[1]/div[2]/div/div/ul/li', 50000);
      console.log("Zoom button appeared");

    });





    /*it('should add bookmark while clicking on bookmark icon', function() {


      browser.click('.//*[@id="root"]/div/div/div/div/div/div[1]/div[1]/div[1]/div[2]/div/div[1]/div/div');
      console.log("Clicked on bookmark icon");

      //browser.waitForExist('.//*[@id="viewer"]/div/div[5]/div/div/div[2]', 50000);
      //console.log("Navigation link found");

    });*/



    it('should click on back button to go bookshelf', function() {

     

      browser.click('.//*[@id="root"]/div/div/div/div/div/div[1]/div[1]/div[1]/div[1]/div/div/span');
      console.log("Clicked on back button");

      browser.waitForVisible('.//*[@id="bookshelf-page"]/div[1]/div[2]/div/button', 50000);
      console.log("Button found");

    });

    it('should click on logout button ', function() {


      browser.click('.//*[@id="bookshelf-page"]/div[1]/div[2]/div/button');
      console.log("Clicked on logout button");

      browser.waitForVisible('.//*[@id="root"]/div/div/div/div/div/div[2]/form/div[1]/input', 50000);
      console.log("Back to login page");

    });





    
 
  });

