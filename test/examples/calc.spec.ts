export function add(x:number, y:number){
    return x + y
}

describe('Initial test', () => {
    test('add function', () => {
        expect(add(2,2)).toEqual(4)
    })

});