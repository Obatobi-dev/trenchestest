<?=Component("head");?>
<style>
.container {
    max-width: 772px;
}
.option {
    /* background-color: #AFEEEE; */
    background-color: black;
    color: white;
    /* height: 200px !important; */
}
.option.active, .option:hover {
    background: linear-gradient(to bottom, #F4C2C2, #AFEEEE);
    color: black;
}
#wrapper-container {
    background: linear-gradient(to right top, #AFEEEE, #F4C2C2);
}

@keyframes example {
    from {opacity: 0.4;}
    to {opacity: 1;}
}

.img {
    display: block;
    width: 150px;
    height: 150px;
    object-fit: contain;
}
</style>
<section id="wrapper-container">
	<?=Component('top-nav')?>
	<main id="wrapper" class="container">
	<!-- <main id="wrapper" class="container d-flex align-items-center justify-content-center"> -->
		<!-- <section class="w-100"> -->
		<section class="pt-5">
			<article id="board" class=""></article>
		</section>
	</main>
</section>

<?=Script('test')?>
<script type="">
Quiz.Init('#board');
</script>