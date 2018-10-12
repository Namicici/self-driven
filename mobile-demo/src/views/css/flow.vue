<template>
   <div class="page">
       <ss-header title="Flow"></ss-header>
       <section>
           <span>我是行内元素span</span>
           <span style="padding:20px;">我是行内元素span，有padding</span>
           <a style="font-size: 20px;">我是行内元素a</a>
           <ul>
               <li>Hi，我是li第一行</li>
               <li>Hi，我是li第二行</li>
           </ul>
           <div class="div1">我是块级元素div1</div>
           <div class="div2">我是块级元素div2</div>
           <p>我是段落元素p，也是块级元素，块级元素默认宽度充满屏幕宽度</p>
           <span>我是行内元素span，给我设置宽高没用</span>
           <div class="div1 inline-block">inline-block</div>
           <span>span</span>
           <div class="div2 inline-block">inline-block，不设置宽度的情况下就看内容啦</div>
           <span>span</span>
           <div class="div1 inline-block">inline-block，不设置宽度的情况下就看内容啦，内容太多，高度也不够的时候，内容溢出咯，并且也没办法跟span一行了</div>
           <table>
                <thead>
                    <th>header1</th>
                    <th>header1</th>
                    <th>header1</th>
                </thead>
                <tbody>
                    <td>数据1</td>
                    <td>数据1</td>
                    <td>数据1</td>
                </tbody>
           </table>
           <span>我是span</span>
           <input value="我是input"/>
           <textarea type="textarea" value="">我是textarea</textarea>

           <span>我是span</span>
           <div class="div2" style="display:inline;height:62px;">div转换为inline元素，宽高失效</div>

           <textarea style="width:100%;height:60px;" value="">我的宽度是100%啦，但是出现了滚动条，主要是box-sizing是content-box，border占用了空间，将box-sizing改为border-box可以解决</textarea>

           <div style="background-color: yellow;position:relative;left:20px;width:250px;height:100px">relative
                <!-- <div class="div1" style="height: 32px;width:32px;"></div> -->
                <div class="div2" style="height: 100px;width:200px;position:absolute;left:20px;top:10px;">
                    <span>absolute</span>
                    <div class="div1" style="position:absolute;top:10px;left:20px;height:100px;width:100px">absolute</div>
                </div>
           </div>
           <div style="width:200px;height:100px;background-color:teal;padding:10%;margin:10%;border:solid 1px #ccc;box-sizing:border-box;">border-box</div>
           <div style="width:200px;height:100px;background-color:teal;padding:10%;margin:10%;border:solid 1px #ccc;background-clip:content-box;">content-box的时候padding按conteng-box的宽度向外扩展</div>

            <div style="margin:30px;border:solid 1px #ccc;">
                <span>margin合并问题（绿黄块都是20像素的margin，但是两者之间margin合并了）</span>
                <div style="width:100px;height:60px;background-color:green;margin:20px 0"></div>
                <div style="width:100px;height:60px;background-color:yellow;margin:20px 0"></div>
            </div>
            <div style="width:200px;height:100px;border:dotted medium;margin:10px;">border style dotted</div>
            <div style="width:200px;height:100px;border:dashed medium;margin:10px;">border style dashed</div>

            <div style="margin:30px;border:solid 1px #ccc;">
                <span>父子之间的margin合并，父/子/父子同时都设置margin的效果是一样的</span>
                <div style="margin:30px;width:100px;height:100px;background-color:red;">
                    <div style="margin:20px;width:60px;height:60px;background-color:yellow;"></div>
                </div>
                <div style="width:100px;height:100px;background-color:red;">
                    <div style="margin:20px;width:60px;height:60px;background-color:yellow;"></div>
                </div>
                <div style="margin:30px;width:100px;height:100px;background-color:red;">
                    <div style="width:60px;height:60px;background-color:yellow;"></div>
                </div>
            </div>

            <div>
                <p>第一行</p>
                <p></p>
                <p></p>
                <p>第四行</p>
                <p>第五行与下面一行连接和谐，父级的div仿佛就不存在一样</p>
            </div>
            <p>这里是div平级的元素</p>

       </section>
   </div>
</template>
<style lang="less" scoped>
span{
    background-color: aliceblue;
}
a{
    background-color:antiquewhite;
}
ul{
    background-color:azure;
    li{
        background-color:beige;
    }
}
.div1{
    background-color:aquamarine;
}

.div2{
    background-color:cadetblue;
}
p{
    background-color:darkkhaki;
}
.inline-block{
    height: 40px;
    display: inline-block;
}
th, td{
    border: solid 1px #ccc;
}

</style>
