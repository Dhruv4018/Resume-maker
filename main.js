
    const { jsPDF } = window.jspdf;
    function showSection(id) {
        document.querySelectorAll('section').forEach(section => section.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    }
    function previewPhoto(event) {
        const img = document.getElementById('photoPreview');
        img.src = URL.createObjectURL(event.target.files[0]);
        img.style.display = 'block';
    }
    function generateAdvancedResume() {
        const doc = new jsPDF();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const education = document.getElementById('education').value;
        const experience = document.getElementById('experience').value;
        const skillsRaw = document.getElementById('skills').value;
        const skills = skillsRaw.split(',').map(skill => skill.trim());
        const photoInput = document.getElementById('photoInput');
        doc.setFontSize(22);
        doc.text(name, 20, 20);
        doc.setFontSize(12);
        doc.text(`Email: ${email}`, 20, 30);
        doc.text(`Phone: ${phone}`, 20, 37);
        doc.text(`Education: ${education}`, 20, 44);
        doc.text(`Experience: ${experience}`, 20, 51);
        doc.text('Skills:', 20, 60);
        let y = 67;
        skills.forEach(skill => { if (skill) { doc.text(`• ${skill}`, 25, y); y += 7; } });
        if (photoInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const imgSize = 50;
                    canvas.width = imgSize;
                    canvas.height = imgSize;
                    ctx.beginPath();
                    ctx.arc(imgSize/2, imgSize/2, imgSize/2, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.clip();
                    ctx.drawImage(img, 0, 0, imgSize, imgSize);
                    const circularImg = canvas.toDataURL('image/png');
                    doc.addImage(circularImg, 'PNG', 140, 20, imgSize, imgSize);
                    doc.save(`${name.replace(/\s+/g, '_')}_Resume.pdf`);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            doc.save(`${name.replace(/\s+/g, '_')}_Resume.pdf`);
        }
    }
    function convertPhotoToPDF() {
        const doc = new jsPDF();
        const photoInput = document.getElementById('photoToPdfInput');
        if (photoInput.files.length === 0) {
            alert('Please select an image to convert.');
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const imgWidth = 180;
                const imgHeight = (img.height * imgWidth) / img.width;
                doc.addImage(img, 'JPEG', 15, 20, imgWidth, imgHeight);
                doc.save('Photo_Converted_to_PDF.pdf');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(photoInput.files[0]);
    }
    function editPdfAndDownload() {
        const doc = new jsPDF();
        const addText = document.getElementById('editText').value;
        doc.text(addText, 20, 20);
        doc.save('Edited_PDF.pdf');
    }
    // Puzzle Game
    const grid = document.getElementById('puzzleGrid');
    const tiles = [...Array(15).keys()].map(n => n + 1).sort(() => Math.random() - 0.5);
    tiles.push('');
    function drawPuzzle() {
        grid.innerHTML = '';
        tiles.forEach((tile, i) => {
            const div = document.createElement('div');
            div.className = 'tile';
            div.textContent = tile;
            div.addEventListener('click', () => moveTile(i));
            grid.appendChild(div);
        });
    }
    function moveTile(index) {
        const empty = tiles.indexOf('');
        const validMoves = [empty - 1, empty + 1, empty - 4, empty + 4];
        if (validMoves.includes(index)) {
            [tiles[empty], tiles[index]] = [tiles[index], tiles[empty]];
            drawPuzzle();
        }
    }
    drawPuzzle();
    // Start overlay logic
    document.getElementById('startButton').addEventListener('click', () => {
        document.getElementById('startOverlay').style.display = 'none';
        document.querySelector('nav').style.display = 'flex';
        showSection('home');
    });
