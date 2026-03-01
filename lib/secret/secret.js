const express = require('express');

const router = express.Router();

function newGame() {
    return {
        secretNumber: Math.floor(Math.random() * 100) + 1,
        guesses: [],
        lastInvalid: false
    };
}

router.use((req, res, next) => {
    if (!req.session.secretGame) {
        req.session.secretGame = newGame();
    }
    next();
});

router.get('/play', (req, res) => {
    const game = req.session.secretGame;

    const won = game.guesses.some(item => item.className === 'correct');

    let debugNumber;
    if (req.query.mode === 'debug') {
        debugNumber = game.secretNumber;
    }

    res.status(200);
    res.type('text/html');
    res.render('secret/play.hbs', {
        guesses: game.guesses,
        won,
        guessCount: game.guesses.length,
        lastInvalid: game.lastInvalid,
        debugNumber
    });
});

router.post('/guess', (req, res) => {
    const game = req.session.secretGame;

    const guessText = req.body.guess;

    if (!guessText || !guessText.match(/^\d+$/)) {
        game.lastInvalid = true;
        res.redirect(303, 'play');
        return;
    }

    game.lastInvalid = false;

    const guessNumber = Number(guessText);

    let className = 'low';
    let message = 'too low';

    if (guessNumber > game.secretNumber) {
        className = 'high';
        message = 'too high';
    }
    else if (guessNumber === game.secretNumber) {
        className = 'correct';
        message = 'correct';
    }

    game.guesses.unshift({
        guess: guessNumber,
        className,
        message
    });

    res.redirect(303, 'play');
});

router.post('/reset', (req, res) => {
    req.session.secretGame = newGame();
    res.redirect(303, 'play');
});

module.exports = { router };