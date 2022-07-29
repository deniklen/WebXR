import { Component, ElementRef, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { Engine, FreeCamera, HemisphericLight, MeshBuilder, PhotoDome, Scene, Vector3 } from '@babylonjs/core';
import '@babylonjs/loaders';
@Component({
    selector: 'app-vr-template',
    templateUrl: './vr-template.component.html',
    styleUrls: ['./vr-template.component.scss']
})
// @Component({
//     selector: 'app-vr-template',
//     templateUrl: '../shared/vr-canvas.component.html',
//     styleUrls: ['../shared/vr-canvas.component.scss']
// })
export class VrTemplateComponent implements OnInit {
    //host listener listening for window resize
    @HostListener('window:resize', ['$event'])
    onResize() {
        this.delay(250);
        this.resize(this.startw, this.starth);
    }

    //conecting dom elements with typescript
    @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
    @Output() engine!: Engine;
    @Output() scene!: Scene;
    @Output() camera!: FreeCamera;
    startw!: number;
    starth!: number;
    constructor() { }

    ngOnInit(): void {
        this.engine = new Engine(this.canvas.nativeElement, true);
        this.scene = new Scene(this.engine);

        // creating camera
        this.camera = this.createCamera(this.scene);

        // creating minimal scean
        this.createScene(this.scene, this.canvas.nativeElement);
        this.startw = this.canvas.nativeElement.width;
        this.starth = this.canvas.nativeElement.height;

        // running babylonJS
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    //Set camera type and controls
    createCamera(scene: Scene) {
        const camera = new FreeCamera('camera1', new Vector3(15, 2, -5), scene);

        camera.setTarget(Vector3.Zero());
        camera.attachControl(this.canvas, false);
        camera.inputs.removeByType("FreeCameraKeyboardInput");

        return camera;
    }

    //create whole Scene
    async createScene(scene: Scene, canvas: HTMLCanvasElement) {
        //lights
        const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        //put loader start here if u want
        //your functions and mathods here
        this.basicScene();
        await this.delay(5000); //this delay can be removed. It is here just because ease of use (waiting for loading to finish)
        //loader end here if u have it

        //options for VR and AR not just WEBGL 
        // if this is after fill background after deciding if ar or not background should be deleted in theory
        const xr = await scene.createDefaultXRExperienceAsync({
            uiOptions: {
                sessionMode: "immersive-vr" || "immersive-ar"
            }
        });
    }
    //delay is needed for properly functioning with page resizing
    async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async basicScene() {
        var sphere = MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, this.scene);

        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;

        // Our built-in 'ground' shape. Params: name, options, scene
        var ground = MeshBuilder.CreateGround("ground", {width: 6, height: 6}, this.scene);

    }
    //resizing method --> called when window is resized
    async resize(startw: number, starth: number) {
        const w = this.engine.getRenderWidth(), h = this.engine.getRenderHeight();
        const hOffset = 5 * (w - startw) / startw;
        const vOffset = 5 * (h - starth) / starth;
        const hSizeDiff = 5 * w / startw;
        const vSizeDiff = 5 * h / starth;
        this.camera.orthoLeft = hSizeDiff - hOffset;
        this.camera.orthoRight = -hSizeDiff - hOffset;
        this.camera.orthoTop = vSizeDiff - vOffset;
        this.camera.orthoBottom = -vSizeDiff - vOffset;
        await this.delay(200);
        this.engine.resize();
    }
}



