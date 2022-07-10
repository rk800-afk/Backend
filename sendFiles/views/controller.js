module.exports.viewHomePage = (_req, res) => {
    res.render('D:/Backend/RentCardemo/pages/home');
}

module.exports.viewRentPage = (_req, res) => {
    res.render('D:/Backend/RentCardemo/pages/rent');
}

module.exports.viewContactPage = (_req, res) => {
    res.render('D:/Backend/RentCardemo/pages/contact.ejs');
}

module.exports.viewReservPage = (_req, res) => {
    res.render('D:/Backend/RentCardemo/pages/reserv.ejs');
}