import { fancy } from 'fancy-test';
import assert from 'assert';

const test = fancy
	.add('test2', () => 1)
	.add('another', () => 2)
	.add('another2', <any>undefined)
	.register('api', (val: string) => ({
		async run(ctx) {
			ctx.another2 = val;
		},
		async finally(ctx) {
			ctx.another = 1;
		}
	}));

describe('test', () => {
	test.api('test').it('works', ctx => {
		assert.strictEqual(ctx.test2, 1);
		assert.strictEqual(1, 1);
	});

	test.only()
		.api('test')
		.it('works again', ctx => {
			assert.strictEqual(ctx.another, 1);
			assert.strictEqual(1, 1);
		});

	it('should work', () => {});
});
