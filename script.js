document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('noiseCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function generateNoise(ctx, width, height) {
        const imageData = ctx.createImageData(width, height);
        for(let i = 0; i < imageData.data.length; i += 4) {
            const value = Math.random() * 255;
            imageData.data[i] = value;     // Red
            imageData.data[i + 1] = value; // Green
            imageData.data[i + 2] = value; // Blue
            imageData.data[i + 3] = 50;    // Alpha 
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function animate() {
        generateNoise(ctx, canvas.width, canvas.height);
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        generateNoise(ctx, canvas.width, canvas.height);
    });
});

// TODO: Collapse into one function
const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨーラリルレロワヰヱヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ';
document.addEventListener("DOMContentLoaded", () => {
    const targetText = document.getElementById('decode-text').textContent;
    //const characters = 'アレックスヨンチャク';
    const textArray = targetText.split('');
    const output = document.getElementById('decode-text');
    let decodedText = '';
    let iterations = 0;

    function getRandomChar() {
        return characters.charAt(Math.floor(Math.random() * characters.length));
    }

    function decode() {
        decodedText = '';
        for(let i = 0; i < textArray.length; i++) {
            if(i <= iterations) {
                decodedText += textArray[i];
            } else {
                decodedText += getRandomChar();
            }
        }
        output.textContent = decodedText;
        if(iterations < textArray.length) {
            iterations++;
            setTimeout(decode, 50);
        }
    }

    decode();
});

document.addEventListener("DOMContentLoaded", () => {
    const targetText = document.getElementById('decode-text2').textContent;
    //const characters = 'アレックスヨンチャク';
    const textArray = targetText.split('');
    const output = document.getElementById('decode-text2');
    let decodedText = '';
    let iterations = 0;

    function getRandomChar() {
        return characters.charAt(Math.floor(Math.random() * characters.length));
    }

    function decode() {
        decodedText = '';
        for(let i = 0; i < textArray.length; i++) {
            if(i <= iterations) {
                decodedText += textArray[i];
            } else {
                decodedText += getRandomChar();
            }
        }
        output.textContent = decodedText;
        if(iterations < textArray.length) {
            iterations++;
            setTimeout(decode, 50);
        }
    }

    decode();
});

document.addEventListener("DOMContentLoaded", () => {
    if(document.getElementById('project-canvas')) {
        let canvas2 = document.getElementById('project-canvas'),
        ctx = canvas2.getContext('2d'),
        links = [...document.querySelectorAll('.select')],
        imagesUrl = [
            'https://i.postimg.cc/4N1jpc7s/jon-tyson-Hu-RTqa-EMD4-I-unsplash.jpg',
            'https://i.postimg.cc/5Nz69CsG/frank-eiffert-nk2svzj-SDX4-unsplash.jpg',
            'https://i.postimg.cc/7PsnWVnS/bp-miller-HAOy-I6-Z57s-I-unsplash.jpg',
            'https://i.postimg.cc/JhFHrDyd/laptop.jpg',
            'https://i.imgur.com/2n33rEn.gif',
            'https://i.pinimg.com/originals/8b/b0/fe/8bb0fe9732cbe45f219965d9d339ca1b.jpg',
        ]
        let imgIndex = 0, imgArray = []

        let targetX = 0, targetY = 0,
        currentX = 0, currentY = 0,
        percent = 0, target = 0

        function lerp(start, end, t){
            return start * (1-t) + end * t
        }

        window.addEventListener('mousemove', e => {
            targetX = e.clientX
            targetY = e.clientY
        })

        imagesUrl.forEach((imgUrl, idx) => {
            let elImage = new Image(300)  
            elImage.src = imgUrl;
            elImage.classList.add('project-image')
            document.body.append(elImage)
            imgArray.push(elImage)
        })

        links.forEach((link, idx) => {
            link.addEventListener('mouseover', () =>{
                links.forEach(anotherLink => {
                    if(anotherLink !== link) {
                        anotherLink.style.opacity = .2
                        anotherLink.style.zIndex = 0
                    } else{
                        anotherLink.style.opacity = 1
                        anotherLink.style.zIndex = 3
                    }
                })
            })

            link.addEventListener('mouseleave', () =>{
                links.forEach(anotherLink => {
                    anotherLink.style.opacity = 1 
                })
                target = 0
            })

            link.addEventListener('mouseenter', () =>{
                imgIndex = idx
                target = 1
            })
        })

        function drawImage(idx){
            let {width, height} = imgArray[idx].getBoundingClientRect()

            canvas2.width = width * window.devicePixelRatio
            canvas2.height = height * window.devicePixelRatio
            canvas2.style.width = `${width}px`
            canvas2.style.height = `${height}px`

            ctx.webkitImageSmoothingEnabled = false
            ctx.mozImageSmoothingEnabled = false
            ctx.msSmoothingEnabled = false
            ctx.imageSmoothingEnabled = false

            if(target === 1) { 
                if(percent < .2) {
                    percent += .01
                } else if(percent < 1) {
                    percent += .1
                }

            } else if(target === 0){
                if(percent > .2) {
                    percent -= .3
                } else if(percent > 0) {
                    percent -= .01

                }
            }

            let scaledWidth = width * percent,
            scaledHeight = height * percent

            if(percent >= 1){
                ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
                ctx.drawImage(imgArray[idx], 0, 0, width, height)

            } else {
                ctx.drawImage(imgArray[idx], 0, 0, scaledWidth, scaledHeight)
                ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

                if(canvas2.width !== 0 && canvas2.height !== 0){
                    ctx.drawImage(canvas2, 0, 0, scaledWidth, scaledHeight, 0, 0, width, height)
                }
            }
        }

        function animate(){
            currentX = lerp(currentX, targetX, 0.075)
            currentY = lerp(currentY, targetY, 0.075)

            let {width, height} = imgArray[imgIndex].getBoundingClientRect(),
            x = currentX - (width / 2),
            y = currentY - (height / 2)
            canvas2.style.transform = `translate3d(${x}px, ${y}px, 0)`

            drawImage(imgIndex)

            window.requestAnimationFrame(animate)
        }

        animate()
    }
});
