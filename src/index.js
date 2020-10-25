import "./index.less";
import Vue from "vue";

const sandbox=((localStorage,undef)=>{
let Post=data=>son.postMessage(data,"*"),
	iframe=document.getElementsByTagName("iframe")[0],son=iframe.contentWindow,
	src=`<script>onmessage=({source:e,data:{c,i,t}})=>{if(e===parent){let n,a=e=>parent.postMessage(e,"*");document.open(),onerror=e=>(a({_:"e",v:e}),!0),console={log(e){a({_:"l",v:e})}},alert=v=>{a({_:"a",v,t})},confirm=prompt=null,n=Function("return "+c)()(i),a({_:"o",v:n}),document.write("<body>"+n)}}</script>`,
	msgMap={a:"alert",l:"log",e:"error",o:"output"},
	token,word="1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
	randStr=len=>{
		let s="";
		for(let i=0;i<len;++i)s+=word[Math.floor(Math.random()*62)];
		return s;
	};
let storePrefix=location.href+"$",undefStr="undefined",
	gets=(dir,val)=>{
		dir=storePrefix+dir;
		if(dir in localStorage===false)return val;
		if(localStorage[dir]===undefStr)return undefined;
		try{return JSON.parse(localStorage[dir]);}catch(e){return val;}
	},
	puts=(dir,val)=>{
		dir=storePrefix+dir;
		if(val!==void 0)try{localStorage[dir]=JSON.stringify(val);}catch(e){localStorage[dir]=undefStr;}
		else localStorage[dir]=undefStr;
	};
let vue=new Vue({
	el:"#main",
	data:{
		input:gets("input",""),funcStr:"",
		log:undef,alert:undef,output:undef,error:undef,success:false
	},
	methods:{
		fresh(l=62){
			iframe.srcdoc=src,this.success=false,token=randStr(l);
			iframe.onload=()=>{
				this.log=this.alert=this.output=this.error=undef;
				Post({c:this.funcStr,i:this.input,t:token});
			};
		},
		doTab({target:e}){
			let str=e.value,st=e.selectionStart,en=e.selectionEnd;
			e.value=str.slice(0,st)+"\t"+str.slice(en),e.selectionStart=e.selectionEnd=st+1;
		}
	},
	watch:{input(e){puts("input",e);}},
	components:{
		"if-show":{
			props:["data","text"],
			template:`<div v-if="data!==void 0" class="show"><span>{{text}}:</span><pre class="text">{{data}}</pre></div>`
		},
		"ok-show":{
			props:["text"],
			template:`<div class="show"><span>{{text}}:</span><slot></slot></div>`
		}
	}
});
addEventListener("message",({source,data})=>{
	if(source!==son||!(data._ in msgMap))return;
	vue[msgMap[data._]]=data.v;
	if(data._==="a"&&data.v===1&&data.t===token)vue.success=true;
});
return{
	fresh(l){vue.fresh(l);},
	setFunc(str){vue.funcStr=str;}
};
})(localStorage);

sandbox.setFunc(`function(s){
	return s;
	//s=JSON.stringify(s).replace(/<\\/script/gi,'');
	//return'<script>console.log('+s+');</script>';
}`);
sandbox.fresh();
