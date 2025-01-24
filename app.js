const express = require('express');
const qrcode = require('qrcode');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { qr: null });
});

app.post('/generate', (req, res) => {
    const { text, darkColor, lightColor } = req.body;


    qrcode.toDataURL(
        text,
        {
            color: {
                dark: darkColor || '#000000', 
                light: lightColor || '#ffffff', 
            },
        },
        (err, url) => {
            if (err) {
                console.error('Ошибка генерации QR-кода:', err);
                res.status(500).send('Ошибка при генерации QR-кода');
            } else {
                res.render('index', { qr: url });
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
