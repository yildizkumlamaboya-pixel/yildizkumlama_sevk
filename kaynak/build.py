# kaynak/app.js dosyasini 12 gzip parcaya boler (app1.bin..app12.bin)
import gzip,os
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
s=open(os.path.join(root,'kaynak','app.js'),encoding='utf-8').read()
n=12;k=-(-len(s)//n)
for i in range(n):
    open(os.path.join(root,f'app{i+1}.bin'),'wb').write(gzip.compress(s[i*k:(i+1)*k].encode('utf-8'),9,mtime=0))
