<?=Component("head");?>
<style>
#wrapper-container {
    background-color: palevioletred;
    background-color: darkmagenta;
}
.text-purple {
    color: purple;
}
.bg-purple {
    background-color: darkmagenta !important;
}
</style>
<section id="wrapper-container" class="bg-info">
	<?=Component('top-nav', ['position' => 'static bg-purple'])?>
	<main id="wrapper">
        <section class="bg-black py-5 text-white">
            <article class="container text-center">
                <div class="d-flex align-items-center justify-content-center gap-3 text-purple my-5">
                    <h2 class="m-0">CA:</h2> <button class="rounded-pill btn btn-secondary text-upper" style="width: 150px;">soon</button>
                </div>

                <div class="my-5 py-3">
                    <h3 class="text-cap">trenches test</h3>
                    <p>Only the real sigmas succeed while the pussies crumble to dust</p>
                </div>

                <a href="<?=ROOT?>/test/" class="btn text-cap btn-primary" style="background: darkmagenta; border-color: indigo;">take the test, pussy</a>
            </article>
        </section>

        <section class="bg-info py-5 text-white">
            <article class="container text-center py-5">
                <h2>Social</h2>
                <div class="my-4">
                    <a href="https://x.com/trenchestest" target="blank"><img class="img-fluid object-fit-contain" style="width: 50px; height: 50px;" src="<?=App_Img('twitter.svg')?>" alt="logo"/></a>
                    <a href="https://github.com/Obatobi-dev/trenchestest"><img class="img-fluid object-fit-contain" style="width: 50px; height: 50px;" src="<?=App_Img('github.png')?>" alt="logo"/></a>
                </div>

                <div>
                    <p>Copyright <i class="far fa-copyright"></i> <?=date("Y")?> - <a href="https://t.me/adewaleweb" class="no-underline text-white" target="blank">Website by Peter</a></p>
                </div>
            </article>
        </section>
	</main>
</section>