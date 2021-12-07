const express = require("express")
const https = require("https")
const ejs = require("ejs");
const bodyParser = require("body-parser")
const app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static("public"));
var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function inWords(num) {
  if ((num = num.toString()).length > 9) return 'overflow';
  n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
  return str;
}
app.get('/', function(req, res) {
  // res.send("Server running succesfully")
  res.sendFile(__dirname + "/tamplet.html")
})

app.post('/', function(req, res) {
  const date = req.body.date;
  const invoice_no = req.body.invoice_no;
  const lrno = req.body.lrno;
  const otnno = req.body.otnno;
  const consignor = req.body.consignor;
  const consigniee = req.body.consigniee;
  const desc = req.body.desc;
  const hsn = req.body.hsn;
  const qty = req.body.qty;
  const unit = req.body.unit;
  const amount = req.body.amount;
  const inwords = inWords(amount)
  res.render('invoice', {
    inwords: inwords,
    date: date,
    invoice_no: invoice_no,
    lrno: lrno,
    otnno: otnno,
    consignor: consignor,
    consigniee: consigniee,
    desc: desc,
    hsn: hsn,
    qty: qty,
    unit: unit,
    amount: amount
  })
})

app.listen(3000, function() {
  console.log("Server running on 3000")
})
