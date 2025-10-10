import {test, expect} from '@playwright/experimental-ct-vue';
import axios from 'axios';
import Ex3 from '../src/components/Ex3.vue';

test('Ex3 add blog post test', async ({mount}) => {
    const component = await mount(Ex3);
    await component.getByRole('textbox').first().fill('New Blog Post');
    await component.locator('textarea').fill('This is the content of the new blog post.');
    await component.getByRole('combobox').selectOption('Angry');
    await component.getByRole('button', {name: 'Submit New Post'}).click();
    
    const newResponse = await axios.get('http://localhost:3000/posts');
    const newPosts = newResponse.data;
    const addedPost = newPosts[0]
    expect(addedPost.subject).toBe('New Blog Post');
    expect(addedPost.entry).toBe('This is the content of the new blog post.');
    expect(addedPost.mood).toBe('Angry');

    await axios.get('http://localhost:3000/deletePost?id=' + addedPost.id);
});