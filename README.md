# WebXR
Starting template for WebXr projects with Babylon.Js and Angular

# Instructions
If this template is your starting point then before the first run:
- position yourself inside WebXRTempalte with:
    
  
      cd WebXRTemplate
- and run 

    
    npm install
If you want to use this template inside your other angular project then: 
- Copy the whole folder inside your angular project 
- Inside angular project run  
    
    
    npm install --save @babylonjs/gui @babylonjs/core @babylonjs/loaders

# Canvas settings
You can either have one global canvas or canvas for every project separately
In this project, you can find both versions. 
If you want to use global canvas, then include it like this in your vr.ts application 

    @Component({
        selector: 'app-vr-template',
        templateUrl: '../shared/vr-canvas.component.html',
        styleUrls: ['../shared/vr-canvas.component.scss']
    })
If you want to use local canvas, then include it like this in your vr.ts application 

    @Component({
        selector: 'app-vr-template',
        templateUrl: './vr-template.component.html',
        styleUrls: ['./vr-template.component.scss']
    })

# Running project
Run 
    
    ng serve --open 
Develop your code and have fun :) 
If you have any questions feel free to contact me!

