const puppeteer = require('puppeteer');
const path = require('path');

async function captureScreenshots() {
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: { width: 1440, height: 900 }
    });
    
    const page = await browser.newPage();
    
    const demos = [
        { url: 'http://192.168.1.109:5500/demo/', name: 'landing-page' },
        { url: 'http://192.168.1.109:5500/demo/demo1.html', name: 'demo1-posshop-circular' },
        { url: 'http://192.168.1.109:5500/demo/demo2.html', name: 'demo2-poshop-minimal' },
        { url: 'http://192.168.1.109:5500/demo/demo3.html', name: 'demo3-dynamic-colors' }
    ];
    
    for (const demo of demos) {
        console.log(`Capturing ${demo.name}...`);
        await page.goto(demo.url, { waitUntil: 'networkidle2' });
        await page.waitForTimeout(2000); // Wait for animations
        
        await page.screenshot({ 
            path: path.join(__dirname, `screenshots/${demo.name}.png`),
            fullPage: false
        });
    }
    
    // Capture product modal in demo3
    console.log('Capturing product modal...');
    await page.goto('http://192.168.1.109:5500/demo/demo3.html', { waitUntil: 'networkidle2' });
    await page.waitForTimeout(1000);
    
    // Click first product to open modal
    await page.click('.product-card:first-child');
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
        path: path.join(__dirname, 'screenshots/demo3-modal-coral.png'),
        fullPage: false
    });
    
    await browser.close();
    console.log('All screenshots captured!');
}

captureScreenshots().catch(console.error);