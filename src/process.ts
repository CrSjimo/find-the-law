import { Button } from "@material/mwc-button";
import { TextField } from "@material/mwc-textfield";
import findLaw from 'find-the-law';
import _md from 'markdown-it';
const markdown = _md();
///@ts-ignore
import mk from 'markdown-it-katex';

markdown.use(mk,{"throwOnError" : true, "errorColor" : " #cc0000"});

let input = document.getElementById('input') as TextField;
let article = document.getElementById('article') as HTMLDivElement;
let copyContainer = document.getElementById('copy-container') as HTMLTextAreaElement;
let copyLatex = document.getElementById('copy-latex') as Button;
let copyPlain = document.getElementById('copy-plain') as Button;
let copyArticle = document.getElementById('copy-article') as Button;
let clear = document.getElementById('clear') as Button;

clear.onclick = ()=>{
    article.classList.remove('error');
    article.innerHTML = '';
    copyArticle.onclick = null;
    copyPlain.onclick = null;
    copyLatex.onclick = null;
    copyArticle.disabled = copyPlain.disabled = copyLatex.disabled = clear.disabled = true;
}

input.onkeypress = (e)=>{
    if(e.keyCode==13){
        try{
            let rp = findLaw(input.value.split(' '));
            article.classList.remove('error');
            article.innerHTML = markdown.render(rp.text);
            copyArticle.disabled = copyPlain.disabled = copyLatex.disabled = clear.disabled = false;
            copyLatex.onclick = ()=>{
                copyContainer.value = rp.functionLatex;
                copyContainer.select();
                document.execCommand('Copy')
            }
            copyPlain.onclick = ()=>{
                copyContainer.value = rp.functionText;
                copyContainer.select();
                document.execCommand('Copy')
            }
            copyArticle.onclick = ()=>{
                copyContainer.value = rp.text;
                copyContainer.select();
                document.execCommand('Copy')
            }
        }catch(e){
            article.innerHTML = e.message;
            article.classList.add('error');
        }
        
    }
}
