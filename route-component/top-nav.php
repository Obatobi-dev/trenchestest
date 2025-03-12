<?php $position = $position ?? 'sticky-top'?>
<style type="text/css">
#top-nav {
    z-index: 9999;
    /* box-shadow: 0 0 6px rgba(0 0 0 / 60%); */
    box-shadow: 0 0 1px var(--bs-dark);
    background: transparent;
    backdrop-filter: blur(4px);
}

#top-nav .dropdown-item {
    transition: all .133s;
    font-size: 13px;
    text-transform: capitalize;
    padding: 10px;
}
#top-nav .dropdown-item:hover {
    background: var(--bs-light);
    color: currentColor;
}
.useful-link {
    margin-right: 1rem;
    color: var(--bs-muted);
}
</style>

<nav id="top-nav" class="<?=$position?> p-2">
    <div class="container d-flex align-items-center justify-content-between">
        <a href="<?=ROOT?>/" class="text-white no-underline text-cap"><img class="img-fluid object-fit-contain rounded-pill" style="width: 50px; height: 50px;" src="<?=App_Img('logo.jpg')?>" alt="logo"/></a>

        <div>
            <a class="me-3" href="https://x.com/trenchestest" target="blank"><img class="img-fluid object-fit-contain" style="width: 50px; height: 50px;" src="<?=App_Img('twitter.svg')?>" alt="logo"/></a>
            <a href="https://github.com/Obatobi-dev/trenchestest" target="blank"><img class="img-fluid object-fit-contain" style="width: 50px; height: 50px;" src="<?=App_Img('github.png')?>" alt="logo"/></a>
        </div>
    </div>
</nav>