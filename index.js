const element = document.querySelector("#password")
const tamanhoText = document.querySelector("#password-length-text")

const upperOption= document.querySelector("#upercase-check")
const numberOption = document.querySelector("#number-check")
const symbolOption = document.querySelector("#symbol-check")

const securityIndicatorBar = document.querySelector("#security-indicator-bar")

let recebeValor = 16

function generatePassword(){
    let chars = "abcdefghjkmnpqrstuvwxyz"

    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
    const numberChars = "123456789"
    const symbolChars = "?!@&*()[]"

    if(upperOption.checked)
    {
        chars += upperCaseChars;
    }   

    if(numberOption.checked){
        chars += numberChars;
    }

    if (symbolOption.checked){
        chars += symbolChars;
    }

    let password = ""

    for(i = 0; i < recebeValor; i++){
        var randonNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randonNumber, randonNumber + 1)
    }
    
    element.value = password
    tamanhoText.innerText = recebeValor

    calculateQuality()
    calculateSize()
}

function calculateQuality(){
    const percent = Math.round(
        (recebeValor / 64) * 100 * 0.25 + 
        (upperOption.checked ? 15 : 0)+
        (numberOption.checked ? 25 : 0)+
        (symbolOption.checked ? 35 : 0)
    )

    if(percent >= 69){
        securityIndicatorBar.classList.remove("warning")
        securityIndicatorBar.classList.remove("critical")
        securityIndicatorBar.classList.add("safe")
    }else if(percent > 50){
        securityIndicatorBar.classList.remove("safe")
        securityIndicatorBar.classList.remove("critical")
        securityIndicatorBar.classList.add("warning")
    }
    else{
        securityIndicatorBar.classList.remove("safe")
        securityIndicatorBar.classList.remove("warning")
        securityIndicatorBar.classList.add("critical")
    }

    if(percent >= 100){
        securityIndicatorBar.classList.add("completed")
    }else{
        securityIndicatorBar.classList.remove("completed")
    }
    securityIndicatorBar.style.width = `${percent}%`
}

function copy(){
    navigator.clipboard.writeText(element.value)
}

function calculateSize(){
    if(recebeValor > 45){
        element.classList.remove("font-sm")
        element.classList.remove("font-xs")
        element.classList.add("font-xxs")
    }else if(recebeValor > 32){
        element.classList.remove("font-sm")
        element.classList.remove("font-xxs")
        element.classList.add("font-xs")
    }else if(recebeValor > 22){
        element.classList.remove("font-xs")
        element.classList.remove("font-xxs")
        element.classList.add("font-sm")
    }else{
        element.classList.remove("font-xs")
        element.classList.remove("font-xxs")
        element.classList.remove("font-sm")
    }
}
const passwordLength = document.querySelector("#password-length")
passwordLength.addEventListener("input", function(){
     recebeValor = passwordLength.value
     generatePassword()
})

generatePassword()

upperOption.addEventListener('click', generatePassword)
numberOption.addEventListener('click', generatePassword)
symbolOption.addEventListener('click', generatePassword)


document.querySelector("#copy-1").addEventListener("click", copy)
document.querySelector("#copy-2").addEventListener("click", copy)

document.querySelector("#renew").addEventListener("click", generatePassword)