import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    'https://cdsjmexrmrpazrkntkzl.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTc5MjU0NCwiZXhwIjoxOTU3MzY4NTQ0fQ.gZBxITbSzGZlYcwoeolADxI6m8rEoLFjrMgM9johZ28'
)

export default supabase
