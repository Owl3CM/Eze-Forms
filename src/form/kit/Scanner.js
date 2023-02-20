import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { Div, Video } from "../scripts/NodeBuilder";

const Scanner = async (onResult) => {
    if (global.platform !== "web") nativeScanner(onResult);
    else {
        const codeReader = new BrowserMultiFormatReader();
        let cameras = await codeReader.listVideoInputDevices();
        let camIndex = cameras.length > 1 ? 1 : 0;

        const container = Div({ style: "position:fixed;inset:0;z-index:999999999;background-color:rgb(22, 22, 22)" }, [
            Video({ style: "width: 100%; height: 100%; object-fit: cover; border-radius: 10px; border-radius:20px; " }),
            getControles(stopCapture, cameras.length > 1 ? toggleCamera : null),
        ]);

        function captureStart() {
            codeReader.decodeFromVideoDevice(cameras[camIndex].deviceId, "video", (result, err) => {
                if (result) {
                    onResult(result);
                    stopCapture();
                }
                if (err && !(err instanceof NotFoundException)) console.log("error", err);
            });
        }
        function stopCapture() {
            codeReader.reset();
            container.remove();
        }

        function toggleCamera() {
            if (camIndex >= cameras.length - 1) camIndex = 0;
            else camIndex++;
            codeReader.reset();
            captureStart();
        }
        document.body.append(container);
        setTimeout(captureStart, 100);
        let passiveBackEvent = global.onBack;
        global.onBack = () => {
            stopCapture();
            global.onBack = passiveBackEvent;
        };
    }
};
export default Scanner;

const nativeScanner = async (onResult) => {
    let frontCamera = false;
    document.getElementById("root").style.visibility = "hidden";
    let theme = document.body.className;
    document.body.className = "scanner";
    const stopCapture = async () => {
        await BarcodeScanner.stopScan();
        document.getElementById("root").style.visibility = "unset";
        document.body.className = theme;
        controls.remove();
    };
    await BarcodeScanner.checkPermission({ force: true });

    const toggleCamera = async () => {
        frontCamera = !frontCamera;
        await BarcodeScanner.stopScan();
        await mobileScan(frontCamera, stopCapture, onResult);
    };

    const controls = getControles(stopCapture, toggleCamera);
    document.body.append(controls);

    let passiveBackEvent = global.onBack;
    global.onBack = async () => {
        stopCapture();
        global.onBack = passiveBackEvent;
    };

    await mobileScan(frontCamera, stopCapture, onResult);
};

async function mobileScan(frontCamera, stopCapture, onResult) {
    const result = await BarcodeScanner.startScan({
        cameraDirection: frontCamera ? "front" : "back",
    });
    if (result.hasContent) {
        stopCapture();
        onResult({ text: result.content });
    }
}

function getControles(stopCapture, toggleCamera) {
    const controlsStyle = "position:absolute;border-radius:50%;right:16px;";
    const controls = Div({ id: "scanner" }, [
        Div({
            style: controlsStyle + "top:16px;",
            innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" class="barcode-svg" height=52 width=52 style={{ padding: 8 }} viewBox="-2 -2 52 52"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>`,
            onclick: stopCapture,
        }),
        toggleCamera
            ? Div({
                  style: controlsStyle + "bottom:16px;",
                  innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" class="barcode-svg" height=52 width=52 style={{ padding: 8 }} viewBox="-2 -2 52 52"><path d="M15.65 33.3q-1.25 0-2.125-.875T12.65 30.3V17.7q0-1.25.875-2.125t2.125-.875h2.25l1.5-1.5h9.35l1.5 1.5h2.25q1.25 0 2.125.875T35.5 17.7v12.6q0 1.25-.875 2.125T32.5 33.3Zm0-3H32.5V17.7H15.65v12.6Zm8.4-3.25q1.25 0 2.125-.875t.875-2.125q0-1.25-.875-2.125t-2.125-.875q-1.25 0-2.125.875t-.875 2.125q0 1.25.875 2.125t2.125.875ZM18.5.65q1.35-.35 2.75-.5 1.4-.15 2.8-.15 4.65 0 8.85 1.675Q37.1 3.35 40.325 6.3q3.225 2.95 5.275 6.95 2.05 4 2.45 8.65h-3q-.3-3.9-2-7.275-1.7-3.375-4.375-5.9Q36 6.2 32.5 4.675T25.1 2.95l3.8 3.8-2.15 2.15Zm11.05 46.7q-1.35.35-2.725.5-1.375.15-2.775.15-4.7 0-8.875-1.675T7.75 41.7q-3.25-2.95-5.3-6.95t-2.5-8.65H3q.3 3.9 2 7.275 1.7 3.375 4.375 5.9 2.675 2.525 6.175 4.05t7.4 1.725l-3.8-3.8 2.15-2.15ZM24.1 24Z" /></svg>`,
                  onclick: toggleCamera,
              })
            : "",
    ]);
    return controls;
}
