<script lang="ts">
    import { createEventDispatcher } from 'svelte'

    import { Dialog, TextField, Dropdown } from '@shared'
    import { createCollection } from '@services'

    const dispatch = createEventDispatcher()
    
    const collectionTypeOptions = ['public', 'private'] as const
    let newCollectionTextField: HTMLInputElement

    let collectionName: string
    let collectionType: 'public' | 'private'
    let collectionError = ''
    let isCollectionProcessing = false
    $: {
        collectionName = undefined
        collectionType = undefined
        collectionError = ''
    }

    const close = () => {
        dispatch('close')
    }

    const createNewCollection = async () => {
        if (isCollectionProcessing) return

        if (!collectionName) {
            collectionError = "Name can't be empty"
            return
        }

        if (!collectionTypeOptions.includes(collectionType)) {
            collectionError = 'Invalid collection type'
            return
        }

        isCollectionProcessing = true

        const newCollection = await createCollection({
            title: collectionName,
            public: collectionType === 'public'
        })

        isCollectionProcessing = false

        if (newCollection instanceof Error)
            collectionError = newCollection.message
        else {
            dispatch('create', {
                close,
                id: newCollection.id,
                public: newCollection.public,
                title: newCollection.title
            })
        }
    }
</script>

<Dialog
    title="New Collection"
    action="Create"
    on:close={close}
    on:action={createNewCollection}
>
<TextField
    bind:value={collectionName}
    bind:inputElement={newCollectionTextField}
    onChange={createNewCollection}
    required
    noLeading
    label="Collection Name"
    name="collection-name"
    placeholder="Name"
/>
<div class="flex justify-between items-center w-full">
    <p class="text-lg font-medium text-gray-700 dark:text-gray-400">Publicity</p>
    <Dropdown
        bind:value={collectionType}
        options={['private', 'public']}
        class="capitalize"
    />
</div>

{#if collectionError}
    <p class="text-red-500 text-sm">{collectionError}</p>
{/if}
</Dialog>