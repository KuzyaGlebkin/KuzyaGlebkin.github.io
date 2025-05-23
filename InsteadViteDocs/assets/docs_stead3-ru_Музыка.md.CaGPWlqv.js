import{_ as i,c as a,o as n,ag as p}from"./chunks/framework.BDwTZuFy.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/stead3-ru/Музыка.md","filePath":"docs/stead3-ru/Музыка.md"}'),t={name:"docs/stead3-ru/Музыка.md"};function l(h,s,e,k,d,r){return n(),a("div",null,s[0]||(s[0]=[p(`<h2 id="музыка" tabindex="-1">Музыка <a class="header-anchor" href="#музыка" aria-label="Permalink to &quot;Музыка&quot;">​</a></h2><p>Для работы с музыкой и звуками вам понадобится модуль snd.</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">require</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;snd&quot;</span></span></code></pre></div><p>Интерпретатор проигрывает в цикле текущую музыку, которая задаётся с помощью функции: &#39;snd.music(путь к музыкальному файлу)&#39;.</p><p><strong>Важно!</strong></p><p>Используйте в путях только прямые &#39;/&#39;. Также, настоятельно рекомендуется использовать в именах каталогов и файлов только латинские строчные символы. Этим самым вы обезопасите свою игру от проблем с совместимостью и она будет работать на всех архитектурных платформах, куда портирован INSTEAD.</p><p>Поддерживается большинство музыкальных форматов, но настоятельно рекомендуется использовать формат &#39;ogg&#39;, так как именно он поддерживается наилучшим образом во всех версиях INSTEAD (для различных платформ).</p><p><strong>Важно!</strong></p><p>Следует проявлять осторожность при использовании трекерной музыки, так как в некоторых дистрибутивах Linux могут быть проблемы при проигрывании определённых файлов (ошибки в связке библиотек SDL_mixer и libmikmod).</p><p>Также, если вы используете &#39;mid&#39; файлы, будьте готовы к тому, что игрок услышит их только в Windows версии INSTEAD (так как в большинстве случаев, Unix версии SDL_mixer собраны без поддержки &#39;&#39;timidity&#39;&#39;).</p><p>В качестве частоты музыкальных файлов используйте частоты кратные 11025.</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">room</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	pic </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;gfx/street.png&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	enter</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		snd.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">music</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;mus/rain.ogg&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	end</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	nam </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;на улице&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	dsc </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;На улице идёт дождь.&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><p>&#39;snd.music()&#39; без параметра возвращает текущее имя трека.</p><p>В функцию &#39;snd.music()&#39; можно передавать второй параметр -- количество проигрываний (циклов). Получить текущий счётчик можно с помощью &#39;snd.music()&#39; без параметров -- второе возвращаемое значение. 0 -- означает вечный цикл. 1..n -- количество проигрываний. -1 -- проигрывание текущего трека закончено.</p><p>Для того, чтобы отменить проигрывание музыки, вы можете использовать &#39;snd.stop_music()&#39;</p><p>Для того, чтобы узнать, играет ли музыка:</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">snd.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">music_playing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span></code></pre></div><p>Вы можете задавать время нарастания и затухания музыки, с помощью вызова:</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">snd.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">music_fading</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(o, [i])</span></span></code></pre></div><p>Здесь o - время в мс. для затухания и i - время в мс. для нарастания музыки. Если задан только один параметр -- оба времени считаются одинаковыми. После вызова, установленные параметры будут влиять на проигрывание всех музыкальных файлов.</p><p>Для проигрывания звуков используйте &#39;snd.play()&#39;. Настоятельно рекомендуется использовать формат &#39;ogg&#39;, хотя большинство распространённых звуковых форматов также будет работать.</p><p>Различие между музыкой и звуковым файлом заключается в том, что движок следит за процессом проигрывания музыки и сохраняет/восстанавливает текущий проигрываемый трек. Выйдя из игры и загрузив её снова, игрок услышит то же музыкальное оформление, что слышал при выходе. Звуки обычно означают кратковременные эффекты, и движок не сохраняет и не восстанавливает звуковые события. Так, если игрок не успел дослушать звук выстрела и вышел из игры, после загрузки файла сохранения он не услышит звук (или его окончание) снова.</p><p>Тем не менее, если учесть то, что &#39;snd.play()&#39; позволяет запускать зацикленные звуки, то различие между музыкой и звуками становится уже не таким однозначным.</p><p>Итак, определение функции: &#39;snd.play(файл, [канал], [цикл])&#39;, где:</p><ul><li>файл -- путь и\\или имя звукового файла;</li><li>канал -- номер канала [0..7]; Если не указан, то выберется первый свободный.</li><li>цикл -- количество проигрываний 1..n, 0 -- зацикливание.</li></ul><p>Для остановки проигрывания звука можно использовать &#39;snd.stop()&#39;. Для остановки звука в определённом канале &#39;snd.stop(канал)&#39;.</p><p><strong>Важно!</strong></p><blockquote><p>Если вы используете зацикленные звуки, вам придётся самим восстанавливать их состояние (запускать снова с помощью &#39;snd.sound()&#39;) в функции &#39;start()&#39;</p></blockquote><p>Например:</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">global</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;wind_blow&#39; </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">...</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> start</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> wind_blow </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">then</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		snd.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">play</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;snd/wind.ogg&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	end</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span></code></pre></div><p>Если вам недостаточно описанных здесь функций по работе со звуком, используйте полное описание модуля &quot;snd&quot;.</p>`,31)]))}const o=i(t,[["render",l]]);export{E as __pageData,o as default};
