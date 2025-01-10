

# 2020 JLU-CTF Challenge Solutions

At that time, I only solved these few challenges. I solved six challenges on Bilibili's cybersecurity platform, but they are not recorded here.

## 1. Something So Fast

**Approach**:
After extracting the file, we get a .gif file with each frame being a QR code. Using [online service](https://zh.bloggif.com/gif-extract?id=a2baa5235403e274622ce0848197e96f) to decompose the .gif file frame by frame, we get nine QR code images. Scanning each one gives us a part of the flag. Connecting them in sequence gives us the flag: `Spirit{8c5c6150-c6bf-4473-ad6a-380016e29ced}`.

## 2. YLBNB

**Approach**:
After extraction, we get a .png image file. Using Windows PowerShell command `Format-Hex ./great_captcha.png` to get the hexadecimal of the image file.

Visual inspection (using ctrl+f in any text editor) reveals the flag on line 105, with context:
```
00000650 70 68 6F 74 6F 73 68 6F 70 3A 4C 61 79 65 72 54 photoshop:LayerT
00000660 65 78 74 3D 22 53 70 69 72 69 74 7B 69 5F 31 5F ext="Spirit{i_1\_
00000670 6C 5F 4C 5F 49 5F 6F 5F 4F 5F 30 5F 43 5F 63 5F l_L_I_o_O_0_C_c\_
00000680 57 5F 77 7D 22 2F 3E 20 3C 2F 72 64 66 3A 42 61 W_w}"/\> \</rdf:Ba
```
Therefore, the flag is: `Spirit{i_1_l_L_I_o_O_0_C_c_W_w}`.

## 3. Garbled Characters

**Approach**:
Save the string "锛筹綈锝夛綊锝夛綌锝涳及锛瑉锛嶏綍锝擄絽锛嶏綍锝旓絾锛嶏紭锛嶏綈锝曪綊锝咃綄锝欙綕" in Dev-C++ with GBK encoding to a text document, then open it in VSCode with UTF-8 encoding. This gives us "Ｓｐｉｒｉｔ{ＰＬz－ｕｓｅ－ｕｔｆ－８－ｐｕｒｅｌｙ}". According to the challenge, the flag is: `Spirit{ＰＬz－ｕｓｅ－ｕｔｆ－８－ｐｕｒｅｌｙ}`.

## 4. Expert's Study Schedule

Drawing each date on the calendar gives us a pattern. [Note: the circles were drawn by mistake, and there was ambiguity between letters "I", "E" and number "6" in the fifth position (putting "i" to the right of "E" makes "6"). After multiple attempts, it was determined to be "6".] Finally, all characters are "5471609XNFHZ", so the flag is: `Spirit{5471609XNFHZ}`.

## 5. Double Insurance

Download materials: https://misakanetwork.lanzous.com/irxJRhdf3ve
Using the service at [https://www.toolnb.com/tools/pyc.html](https://www.toolnb.com/tools/pyc.html) to decompile double_check.pyc from the provided zip file, we get the following code:

```python
def xor(a, b):
    return bytes([x[0] ^ x[1] for x in zip(a, b)])

def load_asset():
    return open('data', 'rb').read()

def check(data, key1, key2):
    key1 = int(key1)
    cipher = data[key1:key1 + 26]
    return xor(key2.encode(), cipher) == 'Kvbm4aeoZzR5upGgKjqPE39ovM'
```

After analysis, using the following code to find the flag:

```python
def xor(a, b):
    return bytes([x[0] ^ x[1] for x in zip(a, b)])

def load_asset():
    return open('data', 'rb').read()

def check(data, key1, key2):
    key1 = int(key1)
    cipher = data[key1:key1 + 7] # 7 characters for "Spirit{"
    return xor(key2.encode(), cipher) == 'Kvbm4ae' # Should match encrypted "Spirit{"

data = load_asset()
total = 'Kvbm4aeoZzR5upGgKjqPE39ovM'
crack = data[374543:374569] # Flag starts at position 374543 and ends at 374569, total 27 characters

k = 0
for j in total:
    for i in range(0, 127):
        if xor(i,crack[k]) == (total[k].encode()):
            print(chr(i)) # Compare binary file with attempted character value i, output matching character
            k+=1
            break
```

The output gives us: `Spirit{prune_1s_1mp0rtant}`.

## 6. Shell

In a Linux environment with netcat installed, enter command `nc 59.72.109.16 30001`, then `ls -l` to get the list of all files in the current directory. Continue with the `cat` command to get the flag.

## 7. Check-in Challenge

Caesar cipher: `Mjclcn{mcah_ch_qcnb_wuymul?}`

Caesar cipher is a simple substitution cipher. Using Android app "Caesar cipher" or other web decryption services directly gives 25 different results (because there are only 26 English letters, so only 25 possibilities). Based on the string fragment "Spirit", we know the flag is: `Spirit{sign_in_with_caesar?}`.

## 8. Peppa Pig

According to the pigpen cipher:
[Image description]
Replacing the dots in the flag image with the corresponding numbers, we get the flag: `Spirit{FFF9A7C5577A}`.

---
[writeup.pdf](https://github.com/BH3GEI/blog/files/13324474/writeup.pdf)
![result_BdeoA](https://github.com/BH3GEI/blog/assets/58540850/753eeb55-d804-496b-9ba6-8cf5ae7d7f42)


# 2020 JLU-CTF部分赛题解题思路(无营养)

当时只做出这么几道题。bilibili网安做了六道题但这里还没有记录。

## 1. something so fast

**思路**：
解压文件后得到一个.gif文件，每一帧都是一个二维码。利用[在线服务](https://zh.bloggif.com/gif-extract?id=a2baa5235403e274622ce0848197e96f)逐帧分解.gif文件服务，得到九张二维码图片，每张扫描后得到flag的一部分。顺序连接得到flag为：`Spirit{8c5c6150-c6bf-4473-ad6a-380016e29ced}`。

## 2. YLBNB

**思路**：
解压后得到.png图片文件，使用Windows PowerShell的`Format-Hex ./great_captcha.png`命令得到图片文件的十六进制。

肉眼观察（在任一文本编辑器ctrl+f查找）后可以发现flag在第105行，上下文为：
```
00000650 70 68 6F 74 6F 73 68 6F 70 3A 4C 61 79 65 72 54 photoshop:LayerT
00000660 65 78 74 3D 22 53 70 69 72 69 74 7B 69 5F 31 5F ext="Spirit{i_1\_
00000670 6C 5F 4C 5F 49 5F 6F 5F 4F 5F 30 5F 43 5F 63 5F l_L_I_o_O_0_C_c\_
00000680 57 5F 77 7D 22 2F 3E 20 3C 2F 72 64 66 3A 42 61 W_w}"/\> \</rdf:Ba
```
故flag为：`Spirit{i_1_l_L_I_o_O_0_C_c_W_w}`。

## 3. 锟斤拷

**思路**：
在dev c++内以GBK格式保存字符串"锛筹綈锝夛綊锝夛綌锝涳及锛瑉锛嶏綍锝擄絽锛嶏綍锝旓絾锛嶏紭锛嶏綈锝曪綊锝咃綄锝欙綕"到一个文本文档, 再用vscode以utf-8模式打开此文本文档，即可得到"Ｓｐｉｒｉｔ{ＰＬz－ｕｓｅ－ｕｔｆ－８－ｐｕｒｅｌｙ}"，根据题意得到flag为：`Spirit{ＰＬz－ｕｓｅ－ｕｔｆ－８－ｐｕｒｅｌｙ}`。

## 4. 大佬的学习计划表

把每一个日期都画在日历上可以得到如下图样：[(圈是误画，)其中第五位字符处产生了两个字母"I""E"与数字"6"之间的歧义(将"i"拼到"E"的右边就是"6"),多次实验得到其表意为"6".]最终得到全部字符为" 5471609XNFHZ", 故flag为：`Spirit{5471609XNFHZ}`。

## 5. 双重保险

材料下载：https://misakanetwork.lanzous.com/irxJRhdf3ve
利用网址 [https://www.toolnb.com/tools/pyc.html](https://www.toolnb.com/tools/pyc.html)提供的服务对题目提供的压缩包内部的double_check.pyc进行反编译得到如下代码：

```python
def xor(a, b):
    return bytes([x[0] ^ x[1] for x in zip(a, b)])

def load_asset():
    return open('data', 'rb').read()

def check(data, key1, key2):
    key1 = int(key1)
    cipher = data[key1:key1 + 26]
    return xor(key2.encode(), cipher) == 'Kvbm4aeoZzR5upGgKjqPE39ovM'
```

解析后，利用如下代码试出flag：

```python
def xor(a, b):
    return bytes([x[0] ^ x[1] for x in zip(a, b)])

def load_asset():
    return open('data', 'rb').read()

def check(data, key1, key2):
    key1 = int(key1)
    cipher = data[key1:key1 + 7] #"Spirit{"共7个字符
    return xor(key2.encode(), cipher) == 'Kvbm4ae' #返回值应为"Spirit{"加密的结果

data = load_asset()
total = 'Kvbm4aeoZzR5upGgKjqPE39ovM'
crack = data[374543:374569] #根据前七位定位到data二进制文件的374543位处flag开始，直到374569位，此区间内与flag相同，共27个字符。

k = 0
for j in total:
    for i in range(0, 127):
        if xor(i,crack[k]) == (total[k].encode()):
            print(chr(i)) #比对读取的二进制文件和尝试字符值i的值，穷举后满足条件输出该位字符。试验出flag內所有字符后跳出循环
            k+=1
            break
```

可得输出结果为：`Spirit{prune_1s_1mp0rtant}`。

## 6. Shell

在安装了netcat的linux环境下输入命令 `nc 59.72.109.16 30001`，然后继续输入 `ls -l`，得到当前目录下的所有文件列表。继续使用 `cat` 命令得到 flag。

## 7. 签到题

凯撒密码：`Mjclcn{mcah_ch_qcnb_wuymul?}`

凯撒密码，一种简单的替换密码。使用 Android app "Caesar cipher" 或其他 web 解密服务可直接得到 25（因为只有 26 个英文字母，故只有 25 个方案）个不同的结果。根据字符串片段"Spirit"可知 flag 为：`Spirit{sign_in_with_caesar?}`。

## 8. 小猪佩奇

根据猪圈密码：
[Image description]
把 flag 图样中的点状图换为与点数相等的数字，可得 flag 为：`Spirit{FFF9A7C5577A}`。

以上就是我所解答的所有题目，希望能对大家有所帮助，也欢迎有更好解法的大佬们指正。
