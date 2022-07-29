<script lang="ts">
    import { darkTheme } from '@stores'

    export let stroke = $darkTheme ? '#fff' : '#000'
</script>

<div class="loader {$$props.class}">
    <svg class="circular" viewBox="25 25 50 50">
        <circle
            class="path"
            stroke={stroke}
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke-width={4}
            stroke-miterlimit="10"
        />
    </svg>
</div>

<style lang="sass">
    $size: 48px

    .loader
        @apply relative mx-auto my-0 text-blue-500
        width: $size
        height: $size

        &:before
            @apply block
            content: ''
            padding-top: 100%

    .circular 
        @apply absolute top-0 left-0 m-auto w-full h-full
        transform-origin: center center
        animation: rotate 2s linear infinite

    .path 
        stroke-dasharray: 1, 200
        stroke-dashoffset: 0
        stroke-linecap: round
        animation: dash 1.5s ease-in-out infinite

    @keyframes rotate 
        to
            transform: rotate(360deg)

    @keyframes dash 
        0% 
            stroke-dasharray: 1, 200
            stroke-dashoffset: 0
        
        50% 
            stroke-dasharray: 89, 200
            stroke-dashoffset: -35px
        
        100% 
            stroke-dasharray: 89, 200
            stroke-dashoffset: -124px
</style>
