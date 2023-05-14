import { error } from 'console';
import { type } from 'os';
import { z } from 'zod';

const PersonSchema = z.object({
  id: z.number().min(1),
  name: z.string().min(3),
  email: z.string().email()
})

type Person = z.infer<typeof PersonSchema>;

let person = {
  id: 2,
  name: 'Alan',
  email: 'ramalho@gmail.com'
}

const result = PersonSchema.safeParse(person);

console.log(result)
