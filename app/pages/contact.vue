<template>
	<section id="hero">
        <img src="/hero_contact.jpg" alt="" class="object-[center_75%]" />
        <div id="hero-text" v-in-viewport.once="'fade-in-up'">Kapcsolat</div>
    </section>
    <section class="min-h-page">
		<div class="grid grid-rows-2 grid-cols-2 gap-y-8 max-w-6xl h-full mx-auto p-8 max-sm:flex max-sm:flex-col">
			<div class="flex flex-col justify-center items-center col-span-2">
				<h2 class="">Elérhetőségeink</h2>
				<div class="text-center">
					<p>Éttermünk szívesen vállal 12 fő feletti céges vagy családi rendezvény lebonyulítását is, amennyiben azt előzetes egyeztetés előzi meg.</p>
					<p>
						Ha pedig weboldal készítéssel kapcsolatos kérdéseid vannak vagy szimpatikus lenne egy ilyen szerkeszthető responzív SPA applikáció 
						a saját oldalad számára is akkor írj egy levelet a <span class="font-bold">farpadmail@gmail.com</span> e-mail címre vagy 
						látogass el a személyes weboldalamra ahol több ehhez hasonló oldalt is találhatsz.</p>
					<p>
						Várjuk megkeresésed,<br/>
						A Luxus Regius Csapata (vagyis én, Fabók Árpád).
					</p>
				</div>
			</div>
			<div class="flex flex-col justify-center items-start max-sm:items-center">
				<div class="text-left">
					<p>
						<v-icon name="md-locationon-outlined" class="text-accent" />
						<span class="pl-4">1148 Budapest, Luxus út 1/a.</span>
					</p>
					<p>
						<v-icon name="bi-book" class="text-accent" />
						<NuxtLink to="https://fabokarpad.hu" target="_blank" class="pl-4">fabokarpad.hu</NuxtLink>
					</p>
					<p>
						<v-icon name="bi-phone" class="text-accent" />
						<span class="pl-4">+36 30 555 5555</span>
					</p>
					<p>
						<v-icon name="md-email-outlined" class="text-accent" />
						<span class="pl-4">farpadmail@gmail.com</span>
					</p>
					<p class="flex">
						<v-icon name="bi-calendar-week" class="text-accent mt-[3px]" />
						<span class="pl-4">
							H-Szo 8.00-20.00h<br/>
							V 12.00-18.00h
						</span>
					</p>
				</div>
			</div>
			<div class="flex flex-col gap-4">
				<div class="flex justify-between gap-12">
					<div class="w-full"><input placeholder="Név" v-model="form.name" /></div>
					<div class="w-full"><input placeholder="Email" v-model="form.email" /></div>
				</div>
				<div><input placeholder="Tárgy" v-model="form.subject" /></div>
				<div><textarea 
					name="" 
					id="" 
					rows="6"
					placeholder="Üzenet"
					spellcheck="false"
					class="resize-none !h-auto"
					v-model="form.message"
				></textarea></div>
				<p 
					class="text-sm !p-0 text-center max-h-0 transition-all duration-300 overflow-hidden opacity-0"
					:class="{'max-h-20 opacity-100': form.name || form.email || form.subject || form.message}"
				>
					(Ez csak egy díszlet form, a Küldés gomb az oldalamra navigál. Írj nekem levelet ott :)
				</p>
				<NuxtLink to="https://fabokarpad.hu" external class="btn uppercase">
					Küldés
				</NuxtLink>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	useSeoMeta({ title: "Luxus Regius | Kapcsolat" });

	const form = ref({
		name: "",
		email: "",
		subject: "",
		message: ""
	});
</script>

<style scoped>
	#hero {
        #hero-text {
            font-size: 50pt;
        }
    }

	h2 {
		font-family: Source Sans Pro;
		text-transform: uppercase;
    }

	p {
		padding: 0.5rem 0;
	}

	div:has(>input), div:has(>textarea) {
		position: relative;
		display: flex;
		justify-content: center;
		border-bottom: 1px solid var(--color-menu-faded-text);
		
		&::after {
			content: "";
			position: absolute;
			bottom: 0;
			width: 0px;
			height: 1px;
			background-color: var(--color-accent);
			pointer-events: none;
			transition: width 0.5s ease;
		}

		input, textarea {
			width: 100%;
			height: 3.5rem;
			color: var(--color-text);
			padding: 0.25rem 0.25rem 0.25rem 1rem;
			background-color: transparent;
			outline: none;
		}

		&:has(input:focus)::after, &:has(textarea:focus)::after {
			width: 100%;
		}
	}
</style>