---
layout: post
title: js로 코테 준비
---

## 코딩 테스트 문제의 입출력 형식

- 알고리즘 문제에서는 적절한 입출력 양식이 주어진다.

1. 첫 번째 단계는 **데이터를 입력 받거나 생성**하는 것이다.
2. 이후에 적절한 알고리즘을 사용하여 **도출된 정답을 정확한 형식으로 출력**한다.

ex) N명의 학생의 성적 데이터가 주어졌을 때, 이를 내림차순 정렬한 결과를 출력하여라.(+ 입력형식과 출력형식을 주어줌.)

`console.log()` 를 이용한 문제 풀기

<hr>
## fs모듈

- 입력 데이터가 텍스트 파일 형태로 주어지는 경우, **파일 시스템 모듈**을 사용한다.
- 예를 들어 /dev/stdin 파일에 적힌 텍스트를 읽어오는 경우, 다음과 같이 코드를 작성한다.
- 기능: 전체 텍스트를 읽어온 뒤에, 줄바꿈 기호를 기준으로 구분하여 리스트 변환하기.

```js
//readline 모듈보다는 fs를 이용해 파일 전체를 읽어 들여 처리하기.
let fs = require("fs");
let input = fs.readFileSync("/dev/stdom").toString().split("\n");
//let input = fs.readFileSync('input.txt').toString().split('\n');
console.log(input);
```

<hr>
## readline 모듈

- 한 줄씩 입력을 받아서, 처리하여 정답을 출력할 때는 **readline 모듈**을 사용할 수 있다.

```js
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  console.log(input);
  process.exit();
});
```

<hr>
## 문법

### Number와 String 형태 변환

```js
let a = "777";
a = Number(a);
//number로 변환됨.

a = String(a);
//string으로 변환됨.
```

### Array.prototype.reduce()

- 배열의 모든 원소에 대해 특정한 연산을 순차적으로 적용할 때 reduce()를 사용한다.

reduce() 메서드는 배열의 각 요소에 대해 reducer함수를 실행한 뒤에 하나의 결과를 반환한다.

`(accumulator, currentValue) => (반환값)`

- 배열의 각 원소를 하나씩 확인하여, 각 원소는 currentValue에 해당된다.
- 반환값은 그 이후의 원소에 대하여 accumlator에 저장된다.

```js
let data = [5, 2, 9, 8, 4];

let minValue = data.reduce((a, b) => Math.min(a, b));

console.log(minValue); //2

let summary = data.reduce((a, b) => a + b);
console.log(summary); //28
```

### 배열 초기화 방법

1. 직접 값을 설정하여 초기화
   `let arr = [1,2,3,4,5];`
2. 길이가 5이고 모든 원ㄴ소의 값이 0인 배열 초기화
   `let arr = new Array(5).fill(0);`

### 집합 자료형

- 특정한 **원소의 등장 여부**를 파악할 때 집합 자료형을 효과적으로 사용할 수 있다.

```js
let mySet = new Set();

mySet.add(3);
mySet.add(5);
mySet.add(7);
mySet.add(3);

console.log(`원소의 개수: ${mySet.size}`);
console.log(`7을 포함하고 있는가? ${mySet.has(7)}`);

mySet.delete(5);

for (let item of mySet) {
  console.log(item);
}
```

### 소수점 아래 특정 자리에서 반올림

`let x = 123.4567`
2번째 짜리 까지만 출력하려면?
`console.log(x.toFixed(2))`

### 이스케이프 시퀀스

- **예약 문자** 혹은 **특수 문자**를 출력하기 위해 **이스케이프 시퀀스**를 사용할 수 있다.

| 시퀀스 | 문자        |
| ------ | ----------- |
| \t     | 탭          |
| \\\\   | 역 슬래시   |
| \\"    | 큰 따옴표   |
| \\'    | 작은 따옴표 |
