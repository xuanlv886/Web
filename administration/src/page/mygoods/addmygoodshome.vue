<template>
    <div class="systemgoodsclass">
      <div style="height:315px;width:80%;overflow-x:scroll;overflow-y:hidden; border:1px solid #ccc;margin:20px auto">
        <div class="block clearfix">
            <ul class="First">
              <li v-for="items in tableData1" v-bind:key="items.message" :class="{CheckedColor:CheckedTrue1==items.ptId}" v-bind:id="items.ptId" v-on:click="Checked1(items.ptId,items.ptdName)">{{items.ptName}}</li>
            </ul>
            <ul class="Larst First" v-if="shows2">
              <li v-for="items in tableData2" v-bind:key="items.message" :class="{CheckedColor:CheckedTrue2==items.ptdId}" v-bind:id="items.ptdId" v-on:click="Checked2(items.ptdId,items.ptdName)">{{items.ptdName}}</li>
            </ul>
            <ul class="Larst First" v-if="shows3">
              <li v-for="items in tableData3" v-bind:key="items.message" :class="{CheckedColor:CheckedTrue3==items.ptdId}" v-bind:id="items.ptdId" v-on:click="Checked3(items.ptdId,items.ptdName)">{{items.ptdName}}</li>
            </ul>
            <ul class="Larst First" v-if="shows4">
              <li v-for="items in tableData4" v-bind:key="items.message" :class="{CheckedColor:CheckedTrue4==items.ptdId}" v-bind:id="items.ptdId" v-on:click="Checked4(items.ptdId,items.ptdName)">{{items.ptdName}}</li>
            </ul>
            <ul class="Larst First" v-if="shows5">
              <li v-for="items in tableData5" v-bind:key="items.message" :class="{CheckedColor:CheckedTrue5==items.ptdId}" v-bind:id="items.ptdId" v-on:click="Checked5(items.ptdId,items.ptdName)">{{items.ptdName}}</li>
            </ul>
            <ul class="Larst First" v-if="shows6">
              <li v-for="items in tableData6" v-bind:key="items.message" :class="{CheckedColor:CheckedTrue6==items.ptdId}" v-bind:id="items.ptdId" v-on:click="Checked6(items.ptdId,items.ptdName)">{{items.ptdName}}</li>
            </ul>
            <ul class="Larst First" v-if="shows7">
              <li v-for="items in tableData7" v-bind:key="items.message" :class="{CheckedColor:CheckedTrue7==items.ptdId}" v-bind:id="items.ptdId" v-on:click="Checked7(items.ptdId,items.ptdName)">{{items.ptdName}}</li>
            </ul>
            <ul class="Larst First" v-if="shows8">
              <li v-for="items in tableData8" v-bind:key="items.message" :class="{CheckedColor:CheckedTrue8==items.ptdId}" v-bind:id="items.ptdId" v-on:click="Checked8(items.ptdId,items.ptdName)">{{items.ptdName}}</li>
            </ul>
        </div>

      </div>

      <!-- 信息 -->
      <div class="htmlInfo">
        <p style="font-size:18px;border-bottom:1px dashed #ccc;text-align:center;font-weight:700">石家庄爱团科技家装商城软件许可及服务协议</p>
        <p class="p1">首部及导言</p>
        <p>欢迎你使用石家庄爱团科技家装商城软件及服务！</p>
        <p>为使用石家庄爱团科技家装商城软件（以下简称“本软件”）及服务，你应当阅读并遵守《石家庄爱团科技家装商城软件许可及服务协议》（以下简称“本协议”）。请你务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。限制、免责条款可能以加粗形式提示你注意。</p>
        <p>除非你已阅读并接受本协议所有条款，否则你无权下载、安装或使用本软件及相关服务。你的下载、安装、使用、获取微信帐号、登录等行为即视为你已阅读并同意上述协议的约束。</p>
        <p>如果你未满18周岁，请在法定监护人的陪同下阅读本协议及其他上述协议，并特别注意未成年人使用条款。</p>
        <p class="p1">一、协议的范围</p>
        <p>本协议是你与石家庄爱团科技之间关于你下载、安装、使用、复制本软件，以及使用石家庄爱团科技相关服务所订立的协议。</p>
        <p>本协议内容同时包括石家庄爱团科技可能不断发布的关于本服务的相关协议、业务规则等内容。上述内容一经正式发布，即为本协议不可分割的组成部分，你同样应当遵守。</p>
        <p class="p1">二、关于本服务</p>
        <p>2.1 本服务的内容</p>
    
        <p>本服务内容是指石家庄爱团科技向用户提供的互联网+实体商店的同城购物工具（以下称为“家装商城”），为商家和消费者提供便捷的商品交易平台，其功能包括了商品交易相关流程服务，如：商品买卖，支付，消息推送等功能，此外家装商城还相应的推出了即时通讯等功能，以方便商家和消费者进行更好的沟通和商品交易。</p>
        <p>2.2 本服务的形式</p>
        <p>2.2.1 你使用本服务需要下载家装商城客户端软件，对于这些软件，石家庄爱团科技给予你一项个人的、不可转让及非排他性的许可。你仅可为访问或使用本服务的目的而使用这些软件及服务。</p>
        <p>2.2.2 本服务中家装商城客户端软件提供包括但不限于iOS、Android应用版本（此后还将推出其他等版本），用户必须选择与所安装终端设备相匹配的软件版本。</p>
        <p>2.3 本服务许可的范围</p>
        <p>2.3.1 石家庄爱团科技给予你一项个人的、不可转让及非排他性的许可，以使用本软件。你可以在单一台终端设备上安装、使用、显示、运行本软件。</p>
        <p>2.3.2 你可以为使用本软件及服务的目的复制本软件的一个副本，仅用作备份。备份副本必须包含原软件中含有的所有著作权信息。</p>
        <p>2.3.3 本条及本协议其他条款未明示授权的其他一切权利仍由石家庄爱团科技保留，你在行使这些权利时须另外取得石家庄爱团科技的书面许可。石家庄爱团科技如果未行使前述任何权利，并不构成对该权利的放弃。</p>
        <p class="p1">三、软件的获取</p>
        <p>3.1 你可以直接从得到石家庄爱团科技授权的第三方获取。</p>
        <p>3.2 如果你从未经石家庄爱团科技授权的第三方获取本软件或与本软件名称相同的安装程序，石家庄爱团科技将无法保证该软件能够正常使用，并对因此给你造成的损失不予负责。</p>
        <p class="p1">四、软件的安装与卸载</p>
        <p>4.1 石家庄爱团科技可能为不同的终端设备开发了不同的软件版本，你应当根据实际情况选择下载合适的版本进行安装。</p>
        <p>4.2 下载安装程序后，你需要按照该程序提示的步骤正确安装。</p>
        <p>4.3 为提供更加优质、安全的服务，在本软件安装时石家庄爱团科技可能推荐你安装其他软件，你可以选择安装或不安装。</p>
        <p>4.4 如果你不再需要使用本软件或者需要安装新版软件，可以自行卸载。如果你愿意帮助石家庄爱团科技改进产品服务，请告知卸载的原因。</p>
        <p class="p1">五、软件的更新</p>
        <p>5.1 为了改善用户体验、完善服务内容，石家庄爱团科技将不断努力开发新的服务，并为你不时提供软件更新（这些更新可能会采取软件替换、修改、功能强化、版本升级等形式）。</p>
        <p>5.2 为了保证本软件及服务的安全性和功能的一致性，石家庄爱团科技有权不经向你特别通知而对软件进行更新，或者对软件的部分功能效果进行改变或限制。</p>
        <p>5.3 本软件新版本发布后，旧版本的软件可能无法使用。石家庄爱团科技不保证旧版本软件继续可用及相应的客户服务，请你随时核对并下载最新版本。</p>
        <p class="p1">六、用户个人信息保护</p>
        <p>6.1 保护用户个人信息是石家庄爱团科技的一项基本原则，石家庄爱团科技将会采取合理的措施保护用户的个人信息。除法律法规规定的情形外，未经用户许可石家庄爱团科技不会向第三方公开、透露用户个人信息。</p>
        <p>6.2 你在注册帐号或使用本服务的过程中，需要提供一些必要的信息，例如：为向你提供帐号注册服务或进行用户身份识别，需要你填写手机号码；附近相关功能需要你同意使用你所在的地理位置信息；手机通讯录匹配功能需要你授权访问手机通讯录等。若国家法律法规或政策有特殊规定的，你需要提供真实的身份信息。若你提供的信息不完整，则无法使用本服务或在使用过程中受到限制。</p>
        <p>6.3 一般情况下，你可随时浏览、修改自己提交的信息，但出于安全性和身份识别（如号码申诉服务）的考虑，你可能无法修改注册时提供的初始注册信息及其他验证信息。</p>
        <p>6.4石家庄爱团科技将运用各种安全技术和程序建立完善的管理制度来保护你的个人信息，以免遭受未经授权的访问、使用或披露。</p>
        <p>6.5 未经你的同意，石家庄爱团科技不会向石家庄爱团科技以外的任何公司、组织和个人披露你的个人信息，但法律法规另有规定的除外。</p>
        <p>6.6 石家庄爱团科技非常重视对未成年人个人信息的保护。若你是18周岁以下的未成年人，在使用石家庄爱团科技的服务前，应事先取得你家长或法定监护人的书面同意。</p>
        <p class="p1">七、主权利义务条款</p>
        <p>7.1 帐号使用规范</p>
        <p>7.1.1 你在使用本服务前需要注册一个家装商城帐号，或你可以通过授权利用qq，微信，微博第三方账号进行登录。家装商城帐号可通过手机号码进行注册。石家庄爱团科技有权根据用户需求或产品需要对帐号注册和绑定的方式进行变更。</p>
        <p>7.1.32用户有责任妥善保管注册帐户信息及帐户密码的安全，用户需要对注册帐户以及密码下的行为承担法律责任。用户同意在任何情况下不向他人透露帐户及密码信息。当在你怀疑他人在使用你的帐号时，你应立即通知石家庄爱团科技公司。</p>
        <p>7.2 用户注意事项</p>
        <p>7.2.1 你理解并同意：为了向你提供有效的服务，本软件会利用你终端设备的处理器和带宽等资源。本软件使用过程中可能产生数据流量的费用，用户需自行向运营商了解相关资费信息，并自行承担相关费用。</p>
        <p>7.2.4 你理解并同意石家庄爱团科技将会尽其商业上的合理努力保障你在本软件及服务中的数据存储安全，但是，石家庄爱团科技并不能就此提供完全保证，包括但不限于以下情形：</p>
        <p>7.2.4.1 石家庄爱团科技不对你在本软件及服务中相关数据的删除或储存失败负责；</p>
        <p>7.2.4.2石家庄爱团科技有权根据实际情况自行决定单个用户在本软件及服务中数据的最长储存期限，并在服务器上为其分配数据最大存储空间等。你可根据自己的需要自行备份本软件及服务中的相关数据；</p>
        <p>7.2.4.3 如果你停止使用本软件及服务或服务被终止或取消，石家庄爱团科技可以从服务器上永久地删除你的数据。服务停止、终止或取消后，石家庄爱团科技没有义务向你返还任何数据。</p>
        <p>7.2.5 用户在使用本软件及服务时，须自行承担如下来自石家庄爱团科技不可掌控的风险内容，包括但不限于：</p>
        <p>7.2.5.1 由于不可抗拒因素可能引起的个人信息丢失、泄漏等风险；</p>
        <p>7.2.5.2 用户必须选择与所安装终端设备相匹配的软件版本，否则，由于软件与终端设备型号不相匹配所导致的任何问题或损害，均由用户自行承担；</p>
        <p>7.2.5.3 用户在使用本软件访问第三方网站时，因第三方网站及相关内容所可能导致的风险，由用户自行承担；</p>
        <p>7.2.5.4 用户发布的内容被他人转发、分享，因此等传播可能带来的风险和责任；</p>
        <p>7.2.5.5 由于无线网络信号不稳定、无线网络带宽小等原因，所引起的腾讯微信登录失败、资料同步不完整、页面打开速度慢等风险。</p>
        <p>8.1 信息内容规范</p>
        <p>8.1.1 本条所述信息内容是指用户使用本软件及服务过程中所制作、复制、发布、传播的任何内容，包括但不限于家装商城帐号头像、名字、用户说明等注册信息，或文字，图片等发送、回复商品评价，私信，直播等本软件及服务所产生的内容。</p>
        <p>8.1.2 你理解并同意，家装商城一直致力于为用户提供文明健康、规范有序的网络环境，你不得利用家装商城帐号或本软件及服务制作、复制、发布、传播如下干扰家装商城正常运营，以及侵犯其他用户或第三方合法权益的内容，包括但不限于：</p>
        <p>8.1.2.1 发布、传送、传播、储存违反国家法律法规禁止的内容：</p>
        <p>（1）违反宪法确定的基本原则的；</p>
        <p>（2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p>
        <p>（3）损害国家荣誉和利益的；</p>
        <p>（4）煽动民族仇恨、民族歧视，破坏民族团结的；</p>
        <p>（5）破坏国家宗教政策，宣扬邪教和封建迷信的；</p>
        <p>（6）散布谣言，扰乱社会秩序，破坏社会稳定的；</p>
        <p>（7）散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；</p>
        <p>（8）侮辱或者诽谤他人，侵害他人合法权益的；</p>
        <p>（9）煽动非法集会、结社、游行、示威、聚众扰乱社会秩序；</p>
        <p>（10）以非法民间组织名义活动的；</p>
        <p>（11）不符合《即时通信工具公众信息服务发展管理暂行规定》及遵守法律法规、社会主义制度、国家利益、公民合法利益、公共秩序、社会道德风尚和信息真实性等“七条底线”要求的；</p>
        <p>（12）含有法律、行政法规禁止的其他内容的。</p>
        <p>8.1.2.2 发布、传送、传播、储存侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的内容；</p>
        <p>8.1.2.3 涉及他人隐私、个人信息或资料的；</p>
        <p>8.1.2.4 发表、传送、传播骚扰、广告信息、过度营销信息及垃圾信息或含有任何性或性暗示的；</p>
        <p>8.1.2.5 其他违反法律法规、政策及公序良俗、社会公德或干扰微信正常运营和侵犯其他用户或第三方合法权益内容的信息。</p>
        <p>8.2 软件使用规范</p>
        <p>8.2.1 除非法律允许或石家庄爱团科技书面许可，你使用本软件过程中不得从事下列行为：</p>
        <p>8.2.1.1 删除本软件及其副本上关于著作权的信息；</p>
        <p>8.2.1.2 对本软件进行反向工程、反向汇编、反向编译，或者以其他方式尝试发现本软件的源代码；</p>
        <p>8.2.1.3对本软件或者本软件运行过程中释放到任何终端内存中的数据、软件运行过程中客户端与服务器端的交互数据，以及本软件运行所必需的系统数据，进行复制、修改、增加、删除、挂接运行或创作任何衍生作品，形式包括但不限于使用插件、外挂或非石家庄爱团科技经授权的第三方工具/服务接入本软件和相关系统；</p>
        <p>8.2.1.4 通过修改或伪造软件运行中的指令、数据，增加、删减、变动软件的功能或运行效果，或者将用于上述用途的软件、方法进行运营或向公众传播，无论这些行为是否为商业目的；</p>
        <p>8.2.1.5 通过非石家庄爱团科技开发、授权的第三方软件、插件、外挂、系统，登录或使用腾讯软件及服务，或制作、发布、传播上述工具；</p>
        <p>8.2.1.6 自行或者授权他人、第三方软件对本软件及其组件、模块、数据进行干扰；</p>
        <p>8.2.1.7 其他未经石家庄爱团科技明示授权的行为。</p>
        <p>8.2.2 你理解并同意，基于用户体验、家装商城或相关服务平台运营安全、平台规则要求及健康发展等综合因素，石家庄爱团科技有权选择提供服务的对象，有权决定功能设置，有权决定功能开放、数据接口和相关数据披露的对象和范围。针对以下情形，有权视具体情况中止或终止提供本服务，包括但不限于：</p>
        <p>8.2.2.1 违反法律法规或本协议规定的；</p>
        <p>8.2.2.2 影响服务体验的；</p>
        <p>8.2.2.3 存在安全隐患的；</p>
        <p>8.2.2.4 与微信或其服务平台已有主要功能或功能组件相似、相同，或可实现上述功能或功能组件的主要效用的；</p>
        <p>8.2.2.5 界面、风格、功能、描述或使用者体验与家装商城或其服务平台类似，可能造成家装商城用户认为其所使用的功能或服务来源于石家庄爱团科技或经石家庄爱团科技授权的；</p>
        <p>8.2.2.6 违背家装商城或其服务平台运营原则，或不符合石家庄爱团科技其他管理要求的。</p>
        <p>8.3 服务运营规范</p>
        <p>除非法律允许或石家庄爱团科技书面许可，你使用本服务过程中不得从事下列行为：</p>
        <p>8.3.1 提交、发布虚假信息，或冒充、利用他人名义的；</p>
        <p>8.3.2 诱导其他用户点击链接页面或分享信息的；</p>
        <p>8.3.3 虚构事实、隐瞒真相以误导、欺骗他人的；</p>
        <p>8.3.4 侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的；</p>
        <p>8.3.5 未经石家庄爱团科技书面许可利用家装商城帐号和任何功能，以及第三方运营平台进行推广或互相推广的；</p>
        <p>8.3.6 利用家装商城帐号或本软件及服务从事任何违法犯罪活动的；</p>
        <p>8.3.7 制作、发布与以上行为相关的方法、工具，或对此类方法、工具进行运营或传播，无论这些行为是否为商业目的；</p>
        <p>8.3.8 其他违反法律法规规定、侵犯其他用户合法权益、干扰产品正常运营或石家庄爱团科技未明示授权的行为。</p>
        <p>8.4 对自己行为负责</p>
        <p>你充分了解并同意，你必须为自己注册帐号下的一切行为负责，包括你所发表的任何内容以及由此产生的任何后果。你应对本服务中的内容自行加以判断，并承担因使用内容而引起的所有风险，包括因对内容的正确性、完整性或实用性的依赖而产生的风险。石家庄爱团科技无法且不会对因前述风险而导致的任何损失或损害承担责任。</p>
        <p>8.5 违约处理</p>
        <p>8.5.1 如果石家庄爱团科技发现或收到他人举报或投诉用户违反本协议约定的，腾讯有权不经通知随时对相关内容进行删除、屏蔽，并视行为情节对违规帐号处以包括但不限于警告、限制或禁止使用部分或全部功能、帐号封禁直至注销的处罚，并公告处理结果。</p>
        <p>8.5.2 你理解并同意，腾讯有权依合理判断对违反有关法律法规或本协议规定的行为进行处罚，对违法违规的任何用户采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，用户应独自承担由此而产生的一切法律责任。</p>
        <p>8.5.3 你理解并同意，因你违反本协议或相关服务条款的规定，导致或产生第三方主张的任何索赔、要求或损失，你应当独立承担责任；腾讯因此遭受损失的，你也应当一并赔偿。</p>
        <p class="p1">九、知识产权声明</p>
        <p>9.1 腾讯是本软件的知识产权权利人。本软件的一切著作权、商标权、专利权、商业秘密等知识产权，以及与本软件相关的所有信息内容（包括但不限于文字、图片、音频、视频、图表、界面设计、版面框架、有关数据或电子文档等）均受中华人民共和国法律法规和相应的国际条约保护，腾讯享有上述知识产权，但相关权利人依照法律规定应享有的权利除外。</p>
        <p>9.2 未经腾讯或相关权利人书面同意，你不得为任何商业或非商业目的自行或许可任何第三方实施、利用、转让上述知识产权。</p>
        <p class="p1">十、终端安全责任</p>
        <p>10.1 你理解并同意，本软件同大多数互联网软件一样，可能会受多种因素影响，包括但不限于用户原因、网络服务质量、社会环境等；也可能会受各种安全问题的侵扰，包括但不限于他人非法利用用户资料，进行现实中的骚扰；用户下载安装的其他软件或访问的其他网站中可能含有病毒、木马程序或其他恶意程序，威胁你的终端设备信息和数据安全，继而影响本软件的正常使用等。因此，你应加强信息安全及个人信息的保护意识，注意密码保护，以免遭受损失。</p>
        <p>10.2 你不得制作、发布、使用、传播用于窃取微信帐号及他人个人信息、财产的恶意程序。</p>
        <p>10.3 维护软件安全与正常使用是石家庄爱团科技和你的共同责任，石家庄爱团科技将按照行业标准合理审慎地采取必要技术措施保护你的终端设备信息和数据安全，但是你承认和同意腾讯并不能就此提供完全保证。</p>
        <p>10.4 在任何情况下，你不应轻信借款、索要密码或其他涉及财产的网络信息。涉及财产操作的，请一定先核实对方身份，并请经常留意石家庄爱团科技有关防范诈骗犯罪的提示。</p>
        <p class="p1">十二、其他</p>
        <p>
            <span>12.1 你使用本软件即视为你已阅读并同意受本协议的约束。</span>石家庄爱团科技有权在必要时修改本协议条款。你可以在本软件的最新版本中查阅相关协议条款。本协议条款变更后，如果你继续使用本软件，即视为你已接受修改后的协议。如果你不接受修改后的协议，应当停止使用本软件。</p>
        <p>12.2本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。</p>
        <p>12.3若你和石家庄爱团科技之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，你同意将纠纷或争议提交本协议签订地有管辖权的人民法院管辖。</p>
        <p>12.4本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。</p>
        <p>12.5本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。（正文完）</p>
        <p class="p1" style="text-align:right">石家庄爱团科技有限公司</p>
      </div>
        <div style="margin:0 auto;width:80%;height:40px;">
            <span><el-checkbox v-model="Readychecked" @change="ReadycheckedClick">我以同意以上内容</el-checkbox></span>           
        </div>
        <div style="margin:0 auto;width:252px;">
            <el-button v-if="checkedClass!=''" type="primary" :disabled="disabled" @click="Delivergoods">我已阅读上述规则，现在发布商品</el-button>
        </div>
      <el-dialog class="bomb clearfix" title="添加商品" :visible.sync="dialogFormVisible" width="970px" @close='closeDialog("form")' :close-on-click-modal='false'>
          <el-form :model="form"  ref="form" :rules="rules" class="demo-ruleForm clearfix">
              <el-form-item label="类别：" label-width="110px" prop="checkedClass" style="width:100%">
                  <span>{{this.checkedClass}}</span>
              </el-form-item>
              <p style="width:100%;height:1px"></p>
            <el-form-item label="商品名称：" prop="pName" label-width="110px">
              <el-input v-model="form.pName" style="width:175px"></el-input>
            </el-form-item>              
            <el-form-item label="商品品牌：" prop="pBrand" label-width="110px">
              <el-input v-model="form.pBrand" style="width:175px"></el-input>
            </el-form-item>              
            <el-form-item label="商品描述：" prop="pDescribe" label-width="110px" style="width:98%">
              <el-input type="textarea" :autosize="{minRows: 4}" placeholder="请输商品描述" v-model="form.pDescribe" resize="none"></el-input>
            </el-form-item>              
            <el-form-item label="商品原价：" prop="pOriginalPrice" label-width="110px">
              <el-input v-model="form.pOriginalPrice" style="width:175px"></el-input>
            </el-form-item>              
            <el-form-item label="商品现价：" prop="pNowPrice" label-width="110px">
              <el-input v-model="form.pNowPrice" style="width:175px"></el-input>
            </el-form-item>                           
            <el-form-item label="库存数量：" prop="pStockNum" label-width="110px">
              <el-input v-model="form.pStockNum" style="width:175px"></el-input>
            </el-form-item> 
            <el-form-item label="商品权重：" prop="pWeight" label-width="110px">
              <span>{{form.pWeight}}</span>
            </el-form-item>                          
            <el-form-item label="是否推荐商品：" prop="pHaveBooth" label-width="110px" style="width:100%">
                <el-switch v-model="form.pHaveBooth" active-color="#13ce66" inactive-color="#cccccc" @change="pHaveBoothChange" active-value="1" inactive-value="0" :disabled="dsipHaveBooth"></el-switch>
                <span>您的推荐展位使用情况：共【 <span>{{form.sBoothNum}}</span> 】个，剩余【 <span>{{form.sLeftBoothNum}}</span> 】个。</span>
            </el-form-item>  

            <!-- <el-form-item label="商品详情：" prop="pHtml" label-width="110px" style="width:100%">
              <el-input type="textarea" :autosize="{minRows: 4}" placeholder="请输商品描述" v-model="form.pHtml" resize="none"></el-input>
            </el-form-item>  -->

            
                <div style="width:90%;height:20px;background-color:#ffffff;float:left;padding-left:28px;font-weight:700">商品主图：
                    <el-button type="text" :disabled="ProductPicDisabled" style="padding:0;margin:0" @click="ProductPicVisible = true">查看</el-button>
                    <el-button type="text" style="padding:0;margin:0"  v-if="this.ProductPic.length > 4" @click="clearProductPics()">清空</el-button>
                </div>
                <!-- 查看图片 -->
                <el-dialog width="600px" title="图片展示" :visible.sync="ProductPicVisible" append-to-body>
                            <div class="600px">
                                <el-carousel trigger="click" height="570px">
                                    <el-carousel-item v-for="item in ProductPic" :key="item.name">
                                        <img :src="item.src" alt="" style="width:100%;height:100%">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                </el-dialog>
                <div class="vue-uploader" style="width:100%;height:180px;float:left">
                    <div class="file-list">
                        <section v-for="(file, index) of files" class="file-item draggable-item" :key="file.name">
                            <img :src="file.src" alt="" ondragstart="return false;">
                            <span class="file-remove" @click="removes(index)">+</span>
                        </section>
                        <section v-if="this.files.length!=5" class="file-item">
                            <div class="add">
                                <input type="file" @change="fileChanged($event)" ref="file" multiple="multiple" accept="image/jpg,image/jpeg,image/png,image/bmp">
                            </div>
                        </section>
                    </div>
                </div>

                <div style="width:90%;height:20px;background-color:#ffffff;float:left;padding-left:28px;font-weight:700">商品详情：
                    <el-button type="text" :disabled="ProductDetailPicDisabled" style="padding:0;margin:0" @click="ProductDetailPicVisible = true">查看</el-button>
                    <el-button type="text" style="padding:0;margin:0"  v-if="this.ProductDetailPic.length > 0" @click="clearProductDetailPics()">清空</el-button>
                </div>
                <!-- 查看图片 -->
                <el-dialog width="600px" title="图片展示" :visible.sync="ProductDetailPicVisible" append-to-body>
                            <div class="600px">
                                <el-carousel trigger="click" height="800px">
                                    <el-carousel-item v-for="item in ProductDetailPic" :key="item.name">
                                        <img :src="item.src" alt="" style="width:100%;height:100%">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                </el-dialog>
                <div class="clearfix" style="width:100%;">
                  <div class="vue-uploader" style="width:100%;">
                    <div class="file-list">
                        <section v-for="(file, index) of filePic" class="file-item draggable-item" :key="file.name">
                            <img :src="file.src" alt="" ondragstart="return false;">
                            <span class="file-remove" @click="removeInfo(index)">+</span>
                        </section>
                        <section class="file-item">
                            <div class="add">
                                <input ref="vueHtml" type="file" @change="fileChangedInfo" multiple="multiple" accept="image/jpg,image/jpeg,image/png,image/bmp">
                            </div>
                        </section>
                    </div>
                  </div>
                </div>
                

                <div style="width:100%">

                    <el-form-item v-for="item in ppDatas" :label="item.ppName" :key="item.ppName" style="width:100%">
                        <!-- 多选 -->
                        <el-checkbox-group v-model="multiSelectPpValue" style="width:100%;">
                            <el-checkbox v-for="detail in item.details" :label="detail.ppId" v-bind:value="detail.ppId" :key="detail.ppValue">{{detail.ppValue}}</el-checkbox>
                        </el-checkbox-group>
                        <!-- 单选 -->
                        <!-- <el-radio-group v-model="singleSelectPpValue" v-if="item.details[0].ppChoseType == 0">
                            <el-radio v-for="detail in item.details" :label="detail.ppValue" v-bind:value="detail.ppId" :key="detail.ppValue"></el-radio>
                        </el-radio-group> -->
                        <!-- <el-select v-model="singleSelectPpValue" placeholder="请选择" v-if="item.details[0].ppChoseType == 0">
                            <el-option v-for="detail in item.details" :label="detail.ppValue" v-bind:value="detail.ppId" :key="detail.ppValue"></el-option>
                        </el-select> -->
                    </el-form-item>   

                </div>
                <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                    <el-button @click="resetForm('form')" style="float:right;margin-right:20px">关闭</el-button>                
                    <el-button type="primary" @click="submitForm('form')" style="float:right;margin-right:30px">确定</el-button>
                </el-form-item>

          </el-form>
      </el-dialog>




    </div>
</template>
<script>
import qs from "qs";
import axios from "axios";
import api from "../../api/api.js";
export default {
  inject:['reload'],
  data() {
    return {
      ppDatas: [],

      Readychecked: false,
      disabled: true,
      //   上传图片
      status: true,
      files: [],
      ProductPicDisabled:true,
      ProductPicVisible:false,
      ProductPic:[],
      // 商品详情图
      ProductDetailPicDisabled:true,
      ProductDetailPicVisible:false,
      ProductDetailPic:[],
      // 商品详情图
      filePic: [],
      point: {},
      // uploading: false,
      percent: 0,

      // 商品主键标识
      checkedPid: "",
      // 选中
      checkedClass: "",
      checkedClassId: "",
      dialogFormVisible: false,

      dsipHaveBooth: false,
      form: {
        pName: "",
        pBrand: "",
        pDescribe: "",
        pOriginalPrice: "",
        pNowPrice: "",
        pWeight: "1",
        pHaveBooth: "",
        pHtml: "",
        pStockNum: "",
        sBoothNum: "",
        sLeftBoothNum: ""
      },
      userInfo: JSON.parse(sessionStorage.getItem("value")),
      CheckedTrue1: "",
      CheckedTrue2: "",
      CheckedTrue3: "",
      CheckedTrue4: "",
      CheckedTrue5: "",
      CheckedTrue6: "",
      CheckedTrue7: "",
      CheckedTrue8: "",
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      tableData6: [],
      tableData7: [],
      tableData8: [],
      shows2: false,
      shows3: false,
      shows4: false,
      shows5: false,
      shows6: false,
      shows7: false,
      shows8: false,

      // 获取列表
      DetailInfo1: [],
      DetailInfo2: [],
      DetailInfo3: [],
      DetailInfo4: [],
      DetailInfo5: [],
      DetailInfo6: [],
      DetailInfo7: [],
      DetailInfo8: [],

      // 单选选中
      singleSelectPpValue: [],
      // 多选选中
      multiSelectPpValue:[],

      rules: {
        pName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 1, message: "长度在最少 1 个字符", trigger: "blur" }
        ],
        pBrand: [
          { required: true, message: "请输入商品品牌", trigger: "blur" },
          { min: 1, message: "长度在最少 1 个字符", trigger: "blur" }
        ],
        pStockNum: [
          { required: true, message: "请输入商品库存量", trigger: "blur" },
          { min: 1, message: "长度在最少 1 个字符", trigger: "blur" }
        ],
        pDescribe: [
          { required: true, message: "请输入商品描述", trigger: "blur" },
          { min: 1, message: "长度在最少 1 个字符", trigger: "blur" }
        ],
        pOriginalPrice: [
          { required: true, message: "请输入商品原价", trigger: "blur" },
          { min: 1, message: "长度在最少 1 个字符", trigger: "blur" }
        ],
        pNowPrice: [
          { required: true, message: "请输入商品现价", trigger: "blur" },
          { min: 1, message: "长度在最少 1 个字符", trigger: "blur" }
        ],
        pStockNum: [
          { required: true, message: "请输入商品库存量", trigger: "blur" },
          { min: 1, message: "长度在最少 1 个字符", trigger: "blur" }
        ],
        pHtml: [
          { required: true, message: "请输入商品图文详情", trigger: "blur" },
          { min: 1, message: "长度在最少 1 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getDataList: function(n1) {
      // console.log(this.userInfo)
      // 获取商品大类列表
      axios
        .post(
          api.api.url + n1,
          qs.stringify({
            uId: this.userInfo.uId
          }),
          { emulateJSON: true },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
          }
        )
        .then(reponse => {
          // console.log(reponse.data.data)
          this.tableData1 = reponse.data.data;
          this.DetailInfo1 = reponse.data.data;
        });
    },
    getData: function() {
      this.getDataList("msGetProductTypeList");
    },

    Checked1(e, s) {
      this.checkedPid = s;
      this.CheckedTrue2 = "";
      this.CheckedTrue3 = "";
      this.shows3 = false;
      this.CheckedTrue4 = "";
      this.shows4 = false;
      this.CheckedTrue5 = "";
      this.shows5 = false;
      this.CheckedTrue6 = "";
      this.shows6 = false;
      this.CheckedTrue7 = "";
      this.shows7 = false;
      this.CheckedTrue8 = "";
      this.shows8 = false;
      this.CheckedTrue1 = e;
      //   获取某商品大类下商品小类列表接口
      axios
        .post(
          api.api.url + "msSysSettingGetPTDByPtId",
          qs.stringify({
            uId: this.userInfo.uId,
            ptId: e
          }),
          { emulateJSON: true },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
          }
        )
        .then(reponse => {
          // console.log(reponse.data)
          this.HtmlInfo = {};
          if (reponse.data.data == 0) {
            this.shows2 = false;
            // console.log(this.DetailInfo1)
          } else {
            this.checkedClass = "";
            this.shows2 = true;
            this.tableData2 = reponse.data.data;
            this.DetailInfo2 = reponse.data.data;
          }
        });
    },

    Checked2(e, s) {
      this.CheckedTrue3 = "";
      this.CheckedTrue4 = "";
      this.shows4 = false;
      this.CheckedTrue5 = "";
      this.shows5 = false;
      this.CheckedTrue6 = "";
      this.shows6 = false;
      this.CheckedTrue7 = "";
      this.shows7 = false;
      this.CheckedTrue8 = "";
      this.shows8 = false;

      this.CheckedTrue2 = e;
      //   获取某商品大类下商品小类列表接口
      axios
        .post(
          api.api.url + "msSysSettingGetPTDByPtId",
          qs.stringify({
            uId: this.userInfo.uId,
            ptId: e
          }),
          { emulateJSON: true },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
          }
        )
        .then(reponse => {
          // console.log(reponse.data)
          // console.log(this.DetailInfo2)
          for (var i = 0; i < this.DetailInfo2.length; i++) {
            // this.HtmlInfo={}
            if (e == this.DetailInfo2[i].ptdId) {
              // console.log(this.DetailInfo2[i])
              this.HtmlInfo = this.DetailInfo2[i];
            }
          }

          if (reponse.data.data == 0) {
            this.shows3 = false;
            this.checkedClass = s;
            this.checkedClassId = e;
            // console.log(e,s)
          } else {
            this.checkedClass = "";
            this.shows3 = true;
            this.tableData3 = reponse.data.data;
            this.DetailInfo3 = reponse.data.data;
          }
        });
    },

    Checked3(e, s) {
      //   console.log(e)
      this.CheckedTrue4 = "";
      this.CheckedTrue5 = "";
      this.shows5 = false;
      this.CheckedTrue6 = "";
      this.shows6 = false;
      this.CheckedTrue7 = "";
      this.shows7 = false;
      this.CheckedTrue8 = "";
      this.shows8 = false;
      this.CheckedTrue3 = e;
      //   获取某商品大类下商品小类列表接口
      axios
        .post(
          api.api.url + "msSysSettingGetPTDByPtId",
          qs.stringify({
            uId: this.userInfo.uId,
            ptId: e
          }),
          { emulateJSON: true },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
          }
        )
        .then(reponse => {
          // console.log(reponse.data)
          for (var i = 0; i < this.DetailInfo3.length; i++) {
            // this.HtmlInfo={}
            if (e == this.DetailInfo3[i].ptdId) {
              // console.log(this.DetailInfo3[i])
              this.HtmlInfo = this.DetailInfo3[i];
            }
          }

          if (reponse.data.data == 0) {
            this.shows4 = false;
            this.checkedClass = s;
            this.checkedClassId = e;
            // console.log(e,s)
          } else {
            this.checkedClass = "";
            this.shows4 = true;
            this.tableData4 = reponse.data.data;
            this.DetailInfo4 = reponse.data.data;
          }
        });
    },
    Checked4(e, s) {
      this.CheckedTrue5 = "";
      this.CheckedTrue6 = "";
      this.shows6 = false;
      this.CheckedTrue7 = "";
      this.shows7 = false;
      this.CheckedTrue8 = "";
      this.shows8 = false;
      this.CheckedTrue4 = e;
      //   获取某商品大类下商品小类列表接口
      axios
        .post(
          api.api.url + "msSysSettingGetPTDByPtId",
          qs.stringify({
            uId: this.userInfo.uId,
            ptId: e
          }),
          { emulateJSON: true },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
          }
        )
        .then(reponse => {
          // console.log(reponse.data)
          for (var i = 0; i < this.DetailInfo4.length; i++) {
            // this.HtmlInfo={}
            if (e == this.DetailInfo4[i].ptdId) {
              // console.log(this.DetailInfo4[i])
              this.HtmlInfo = this.DetailInfo4[i];
            }
          }

          if (reponse.data.data == 0) {
            this.shows5 = false;
            this.checkedClass = s;
            this.checkedClassId = e;
            // console.log(e,s)
          } else {
            this.checkedClass = "";
            this.shows5 = true;
            this.tableData5 = reponse.data.data;
            this.DetailInfo5 = reponse.data.data;
          }
        });
    },
    Checked5(e, s) {
      this.CheckedTrue6 = "";
      this.CheckedTrue7 = "";
      this.shows7 = false;
      this.CheckedTrue8 = "";
      this.shows8 = false;

      this.CheckedTrue5 = e;
      //   获取某商品大类下商品小类列表接口
      axios
        .post(
          api.api.url + "msSysSettingGetPTDByPtId",
          qs.stringify({
            uId: this.userInfo.uId,
            ptId: e
          }),
          { emulateJSON: true },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
          }
        )
        .then(reponse => {
          // console.log(reponse.data)
          for (var i = 0; i < this.DetailInfo5.length; i++) {
            // this.HtmlInfo={}
            if (e == this.DetailInfo5[i].ptdId) {
              // console.log(this.DetailInfo5[i])
              this.HtmlInfo = this.DetailInfo5[i];
            }
          }

          if (reponse.data.data == 0) {
            this.shows6 = false;
            this.checkedClass = s;
            this.checkedClassId = e;
            // console.log(e,s)
          } else {
            this.checkedClass = "";
            this.shows6 = true;
            this.tableData6 = reponse.data.data;
            this.DetailInfo6 = reponse.data.data;
          }
        });
    },
    Checked6(e, s) {
      this.CheckedTrue7 = "";
      this.CheckedTrue8 = "";
      this.shows8 = false;

      this.CheckedTrue6 = e;
      //   获取某商品大类下商品小类列表接口
      axios
        .post(
          api.api.url + "msSysSettingGetPTDByPtId",
          qs.stringify({
            uId: this.userInfo.uId,
            ptId: e
          }),
          { emulateJSON: true },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
          }
        )
        .then(reponse => {
          // console.log(reponse.data)
          for (var i = 0; i < this.DetailInfo6.length; i++) {
            // this.HtmlInfo={}
            if (e == this.DetailInfo6[i].ptdId) {
              // console.log(this.DetailInfo6[i])
              this.HtmlInfo = this.DetailInfo6[i];
            }
          }

          if (reponse.data.data == 0) {
            this.shows7 = false;
            this.checkedClass = s;
            this.checkedClassId = e;
            // console.log(e,s)
          } else {
            this.checkedClass = "";
            this.shows7 = true;
            this.tableData7 = reponse.data.data;
            this.DetailInfo7 = reponse.data.data;
          }
        });
    },
    Checked7(e, s) {
      this.CheckedTrue8 = "";
      this.CheckedTrue7 = e;
      //   获取某商品大类下商品小类列表接口
      axios
        .post(
          api.api.url + "msSysSettingGetPTDByPtId",
          qs.stringify({
            uId: this.userInfo.uId,
            ptId: e
          }),
          { emulateJSON: true },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
          }
        )
        .then(reponse => {
          // console.log(reponse.data)
          for (var i = 0; i < this.DetailInfo7.length; i++) {
            // this.HtmlInfo={}
            if (e == this.DetailInfo7[i].ptdId) {
              // console.log(this.DetailInfo7[i])
              this.HtmlInfo = this.DetailInfo7[i];
            }
          }

          if (reponse.data.data == 0) {
            this.shows8 = false;
            this.checkedClass = s;
            this.checkedClassId = e;
            // console.log(e,s)
          } else {
            this.checkedClass = "";
            this.shows8 = true;
            this.tableData8 = reponse.data.data;
            this.DetailInfo8 = reponse.data.data;
          }
        });
    },
    Checked8(e, s) {
      this.CheckedTrue8 = e;
      //   获取某商品大类下商品小类列表接口
      axios
        .post(
          api.api.url + "msSysSettingGetPTDByPtId",
          qs.stringify({
            uId: this.userInfo.uId,
            ptId: e
          }),
          { emulateJSON: true },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
          }
        )
        .then(reponse => {
          this.checkedClass = "";
          this.checkedClass = s;
          this.checkedClassId = e;
          // console.log(e,s)
          this.tableData9 = reponse.data.data;
          this.DetailInfo8 = reponse.data.data;
        });
    },

    // 已同意
    ReadycheckedClick() {
      if (this.Readychecked) {
        this.status = true;
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },

    pHaveBoothChange(e) {
      // console.log(e)
      if (e == 0) {
        this.form.pWeight = "1";
      } else if (e == 1) {
        this.form.pWeight = "5";
      }
    },

    // 添加
    Delivergoods() {
      this.ppDatas = [];

      this.dialogFormVisible = true;
      this.ProductPicDisabled = true;
      this.ProductDetailPicDisabled = true;

      // -获取某商户商品推荐橱窗
      axios
        .post(
          api.api.url + "msGetBoothBySId",
          qs.stringify({
            uId: this.userInfo.uId,
            sId: this.userInfo.sId
          }),
          { emulateJSON: true },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
          }
        )
        .then(reponse => {
          this.form.sBoothNum = reponse.data.data.sBoothNum;
          this.form.sLeftBoothNum = reponse.data.data.sLeftBoothNum;
          if (this.form.sLeftBoothNum <= 0) {
            this.dsipHaveBooth = true;
          } else {
            this.dsipHaveBooth = false;
          }
        });

      // -获取某商品全部属性列表接口
      axios
        .post(
          api.api.url + "msGetAllProductPropertyListOfProduct",
          qs.stringify({
            uId: this.userInfo.uId,
            pId: this.checkedPid,
            ptdId: this.checkedClassId
          }),
          { emulateJSON: true },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
          }
        )
        .then(reponse => {
          // 商品属性 0单选  1多选
          for (var i = 0; i < reponse.data.data.length; i++) {
            this.ppDatas.push(reponse.data.data[i]);
          }
        });
    },

    // 确定上传
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // 选中项
          var AllClassChecked = [];
          var ppIds = "";
          // 商品主图
          var ArrList = [];
          var picList = "";

          // 商品详情图
          var ArrListInfo = [];
          var htmlInfo = "";
          // 单选
          // for(var i = 0; i < this.singleSelectPpValue.length; i++) {
          //   AllClassChecked.push(this.singleSelectPpValue[i]);
          // }
          // 多选
          for(var i = 0; i < this.multiSelectPpValue.length; i++) {
            AllClassChecked.push(this.multiSelectPpValue[i]);
          }
          for (var i = 0; i < AllClassChecked.length; i++) {
            ppIds += AllClassChecked[i] + ";";
          }

          const client = new OSS.Wrapper({
            region: "oss-cn-beijing",
            endpoint: "https://oss-cn-beijing.aliyuncs.com",
            accessKeyId: api.api.accessKeyId,
            accessKeySecret: api.api.accessKeySecret,
            bucket: api.api.bucketName
          });

          // 商品主图
          const fNum = this.files;
          for (var i = 0; i < fNum.length; i++) {
            var f = fNum[i].file;
            // console.log(f)
            const Name = f.name;
            // console.log(Name)
            const suffix = Name.substr(Name.indexOf("."));
            const obj = this.timestamp() + Math.ceil(Math.random() * 10 * 100);
            const storeAs = api.api.commodityImg + obj + suffix;
            ArrList.push(obj + suffix);

            // console.log(storeAs)
            client.multipartUpload(storeAs, f).then(function(result) {
              // console.log(result.res.requestUrls)
            });
          }
          // console.log(ArrList)
          for (var i = 0; i < ArrList.length; i++) {
            picList += '{"pName": "' + ArrList[i] + '","pNo": ' + i + "},";
          }
          var reg = /,$/gi;
          picList = picList.replace(reg, "");
          // console.log(picList)
          var picData = '{"pTag": "","pics": [' + picList + "]}";

          // 商品详情图
          const fNumInfo = this.filePic;
          for (var i = 0; i < fNumInfo.length; i++) {
            var f = fNumInfo[i].file;
            // console.log(f)
            const Name = f.name;
            // console.log(Name)
            const suffix = Name.substr(Name.indexOf("."));
            const objInfo =
              this.timestamp() + Math.ceil(Math.random() * 10 * 100);
            const storeAsInfo = api.api.commodityDetails + objInfo + suffix;
            ArrListInfo.push(objInfo + suffix);

            // console.log(ArrListInfo)
            client.multipartUpload(storeAsInfo, f).then(function(result) {
              // console.log(result.res.requestUrls)
            });
          }
          // console.log(ArrListInfo)
          for (var i = 0; i < ArrListInfo.length; i++) {
            htmlInfo +=
              '<img src="' +
              api.api.rootUrl +
              api.api.commodityDetails +
              ArrListInfo[i] +
              '"/>';
          }
          // console.log(htmlInfo)

          // 企业商户发布商品接口
          axios
            .post(
              api.api.url + "msAddProductInfo",
              qs.stringify({
                uId: this.userInfo.uId,
                sId: this.userInfo.sId,
                pName: this.form.pName,
                pBrand: this.form.pBrand,
                pDescribe: this.form.pDescribe,
                picData: picData,
                pOriginalPrice: this.form.pOriginalPrice,
                pNowPrice: this.form.pNowPrice,
                ptdId: this.checkedClassId,
                pWeight: this.form.pWeight,
                pHtml: "<p>" + htmlInfo + "</p>",
                pHaveBooth: this.form.pHaveBooth,
                pStockNum: this.form.pStockNum,
                ppIds: ppIds
              }),
              { emulateJSON: true },
              {
                headers: {
                  "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8"
                }
              }
            )
            .then(reponse => {
              // console.log(reponse)
              if(reponse.data.flag=='true') {
                if(reponse.data.data.status=='true') {
                  this.$notify({
                    title: '成功！',
                    message: '添加成功！',
                    type: 'success'
                  }); 
                } else {
                  this.$notify.error({
                    title: '失败',
                    message: reponse.data.data.errorString,
                    type: 'error'
                  }); 
                }
              } else {
                this.$notify.error({
                  title: '失败',
                  message: reponse.data.errorString,
                  type: 'error'
                });               
              }
            });
            this.reload()
            this.dialogFormVisible = false
          // this.files = [];
          // this.filePic = [];
          // htmlInfo = "";
          // this.multiSelectPpValue = [];
          // this.singleSelectPpValue = [];
          //   (this.dialogFormVisible = false);
          // this.$refs[form].resetFields();
        }
      });
    },
    // add() {
    //     this.$refs.file.click()
    // },

    timestamp: function() {
      const time = new Date();
      const y = time.getFullYear();
      const m = time.getMonth() + 1;
      const d = time.getDate();
      const h = time.getHours();
      const mm = time.getMinutes();
      const s = time.getSeconds();
      const ms = time.getMilliseconds();
      return (
        "" +
        y +
        this.Add0(m) +
        this.Add0(d) +
        this.Add0(h) +
        this.Add0(mm) +
        this.Add0(s) +
        this.Add0(ms)
      );
    },
    Add0: function(m) {
      return m < 10 ? "0" + m : m;
    },

    // 清空商品主图
    clearProductPics() {
                this.ProductPic = [];
                this.files = [];
                this.ProductPicDisabled=true;
        },    
        // 清空商品详情图
        clearProductDetailPics() {
            this.ProductDetailPic=[];
            this.ProductDetailPicDisabled=true;
            this.filePic=[];
        },    

    // 商品主图
    removes(index) {
      this.files.splice(index, 1);
      this.ProductPic.splice(index,1)
    },
    fileChanged() {
      if(4 < this.ProductPic.length) {
                    this.$notify.error({
                        title: '失败',
                        message: '添加失败，商品主图最多上传5张！',
                        type: 'error'
                    }); 
                    return;
      }
      this.ProductPicDisabled=false;
      // console.log(this.$refs.file.files)
      const list = this.$refs.file.files;
      for (let i = 0; i < list.length; i++) {
        if (!this.isContain(list[i])) {
          const item = {
            name: list[i].name,
            size: list[i].size,
            file: list[i]
          };
          this.html5Reader(list[i], item);
          this.files.push(item);
          this.ProductPic.push(item);
        }
      }
      this.$refs.file.value = "";
    },

    // 商品详情图
    removeInfo(index) {
      this.filePic.splice(index, 1);
      this.ProductDetailPic.splice(index,1)
    },
    fileChangedInfo() {
      // console.log(this.$refs)
      this.ProductDetailPicDisabled=false;
      const lists = this.$refs.vueHtml.files;
      for (let i = 0; i < lists.length; i++) {
        if (!this.isContain(lists[i])) {
          const item = {
            name: lists[i].name,
            size: lists[i].size,
            file: lists[i]
          };
          this.html5Reader(lists[i], item);
          this.filePic.push(item);
          this.ProductDetailPic.push(item);
        }
      }
      this.$refs.vueHtml.value = "";
    },

    // 将图片文件转成BASE64格式
    html5Reader(file, item) {
      const reader = new FileReader();
      reader.onload = e => {
        this.$set(item, "src", e.target.result);
      };
      reader.readAsDataURL(file);
    },
    isContain(file) {
      return this.files.find(
        item => item.name === file.name && item.size === file.size
      );
    },

    // 取消上传
    resetForm(form) {
      this.reload()
      this.dialogFormVisible = false

      // this.files = [];
      // this.filePic = [];
      // this.ProductPic = [];
      // this.ProductDetailPic = [];
      // this.multiSelectPpValue = [];
      // this.singleSelectPpValue = [];
      //   (this.dialogFormVisible = false);
      // this.$refs[form].resetFields();
    },
    closeDialog(form) {
      this.reload()
      this.dialogFormVisible = false
      // this.files = [];
      // this.filePic = [];
      // this.ProductPic = [];
      // this.ProductDetailPic = [];
      // this.multiSelectPpValue = [];
      // this.singleSelectPpValue = [];
      //   (this.dialogFormVisible = false);
      // this.$refs[form].resetFields();
    }
  },
  //   钩子函数
  created: function() {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.systemgoodsclass {
  height: 920px;
}
.el-dialog__body {
  padding-top: 0;
}
.CheckedColor {
  background-color: #409eff;
  color: #ffffff;
}
.block {
  width: 1200px;
  height: 300px;
  .First {
    overflow-y: scroll;
    float: left;
    width: 200px;
    height: 300px;
    background-color: #fff;
    li {
      width: 100%;
      height: 35px;
      line-height: 35px;
      text-align: center;
    }
  }
}
.htmlInfo {
  overflow-y: auto;
  margin: 20px auto;
  width: 80%;
  height: 400px;
  border: 1px solid #ccc;
  p {
    margin-top: 5px;
    text-indent: 2em;
  }
  .p1 {
    text-indent: 0em;
    font-weight: 700;
    height: 30px;
    line-height: 30px;
  }
}
.el-form-item {
  width: 50%;
  float: left;
}

// 图片上传
.vue-uploader .file-list {
  padding: 10px 0px;
  padding-left: 110px;
}
.vue-uploader .file-list:after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
  font-size: 0;
}
.vue-uploader .file-list .file-item {
  float: left;
  margin: 0 7px;
  margin-top: 10px;
  border-radius: 6px;
  position: relative;
  width: 150px;
  text-align: center;
}
.vue-uploader .file-list .file-item img {
  border-radius: 6px;
  width: 150px;
  height: 150px;
  border: 1px solid #ececec;
}
.vue-uploader .file-list .file-item .file-remove {
  position: absolute;
  right: 4px;
  display: none;
  top: 4px;
  width: 20px;
  height: 20px;
  font-size: 20px;
  text-align: center;
  color: white;
  cursor: pointer;
  line-height: 20px;
  border-radius: 100%;
  transform: rotate(45deg);
  background: rgba(0, 0, 0, 0.5);
}
.vue-uploader .file-list .file-item:hover .file-remove {
  display: inline;
}
.vue-uploader .file-list .file-item .file-name {
  margin: 0;
  height: 40px;
  word-break: break-all;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.vue-uploader .add {
  position: relative;
  overflow: hidden;
  width: 150px;
  height: 150px;
  float: left;
  text-align: center;
  line-height: 150px;
  font-size: 30px;
  cursor: pointer;
  background: url(../../assets/upImg.png) no-repeat;
  background-size: 100% 100%;
  input {
    position: absolute;
    top: -25px;
    left: -15px;
    width: 180px;
    height: 200px;
    opacity:0;
    filter:alpha(opacity=0);
  }
}
.vue-uploader .upload-func {
  display: flex;
  padding: 10px;
  margin: 0px;
  background: #f8f8f8;
  border-top: 1px solid #ececec;
}
.vue-uploader .upload-func .progress-bar {
  flex-grow: 1;
}
.vue-uploader .upload-func .progress-bar section {
  margin-top: 5px;
  background: #00b4aa;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  transition: all 0.5s ease;
}
.vue-uploader .upload-func .operation-box {
  flex-grow: 0;
  padding-left: 10px;
}
.vue-uploader .upload-func .operation-box button {
  padding: 4px 12px;
  color: #fff;
  background: #007acc;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}
.vue-uploader > input[type="file"] {
  display: none;
}
</style>
