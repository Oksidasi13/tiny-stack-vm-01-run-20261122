import{mkdirSync as M,readdirSync as R,readFileSync as F,writeFileSync as W}from'node:fs';
import{join as J}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',P="000112230000000022222221222122202220000000000000011000000000000012000000000000001101",Q="011022330000000011111111111111101110000000000000000000000000000010000000000000000010",E=new TextEncoder;
function r(p,n){
const D=new Int32Array(256),C=new Int32Array(64),Y=new Int32Array(256),o=new Uint8Array(65536);
let s=0,c=0,l=0,g=0,x=0,t=0;
const v=y=>[o.subarray(0,l),y];
for(;;){
if(t===1e6)return v(10);
if(x<0||x>=p.length)return v(9);
const a=p[x],m=a===1?1:a===2?4:a>=48&&a<52?2:0;
if(x+m>=p.length)return v(9);
t++;
const k=x+1+m,j=+P[a],h=+Q[a];
if(s<j)return v(2);
if(s-j+h>256)return v(3);
x=k;
if(a>=16&&a<=34&&a!==31&&a!==23&&a!==27){
const B=D[s-1],A=D[s-2];let w;
if(a===16)w=A+B|0;
else if(a===17)w=A-B|0;
else if(a===18)w=Math.imul(A,B);
else if(a===19){if(!B)return v(4);w=A===-2147483648&&B===-1?A:A/B|0;}
else if(a===20){if(!B)return v(4);w=B===-1?0:A%B|0;}
else if(a===21){if(!B)return v(4);w=Math.floor((A>>>0)/(B>>>0))|0;}
else if(a===22){if(!B)return v(4);w=(A>>>0)%(B>>>0)|0;}
else if(a===24)w=A&B;
else if(a===25)w=A|B;
else if(a===26)w=A^B;
else if(a===28)w=A<<(B&31);
else if(a===29)w=A>>(B&31);
else if(a===30)w=A>>>(B&31)|0;
else if(a===32)w=A===B?1:0;
else if(a===33)w=A<B?1:0;
else w=(A>>>0)<(B>>>0)?1:0;
s-=2;D[s++]=w;continue;
}
switch(a){
case 0:return v(0);
case 1:D[s++]=(p[k-1]<<24)>>24;break;
case 2:D[s++]=p[k-4]|(p[k-3]<<8)|(p[k-2]<<16)|(p[k-1]<<24);break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:[D[s-1],D[s-2]]=[D[s-2],D[s-1]];break;
case 6:D[s]=D[s-2];s++;break;
case 7:{const z=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=z;break;}
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 48:x=k+(((p[k-2]|(p[k-1]<<8))<<16)>>16);continue;
case 49:case 50:{const z=D[--s],q=((p[k-2]|(p[k-1]<<8))<<16)>>16;if((a===49)===(z===0))x=k+q;continue;}
case 51:if(c===64)return v(7);C[c++]=k;x=p[k-2]|(p[k-1]<<8);continue;
case 52:if(!c)return v(8);x=C[--c];continue;
case 64:{const z=D[s-1];if(z<0||z>=256)return v(6);D[s-1]=Y[z];break;}
case 65:{const z=D[s-1],y=D[s-2];if(z<0||z>=256)return v(6);s-=2;Y[z]=y;break;}
case 80:{const z=E.encode(String(D[--s]));if(l+z.length>65536)return v(11);o.set(z,l);l+=z.length;break;}
case 81:if(l+1>65536)return v(11);o[l++]=D[--s]&255;break;
case 82:D[s++]=g<n.length?n[g++]:-1;break;
case 83:return v(D[--s]&255);
default:return v(5);
}
}
}
for(const i of R(I).sort()){
const[u,y]=r(F(J(I,i,'program.bin')),F(J(I,i,'input.bin')));
M(J(O,i),{recursive:true});W(J(O,i,'stdout.bin'),u);W(J(O,i,'exit.txt'),y+'\n');
}
