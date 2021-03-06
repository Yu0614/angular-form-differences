<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

-   [Project](#project)
    -   [License](#license)
    -   [Angular の form について](#angular-%E3%81%AE-form-%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
        -   [リアクティブフォーム](#%E3%83%AA%E3%82%A2%E3%82%AF%E3%83%86%E3%82%A3%E3%83%96%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A0)
            -   [使用方法](#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
            -   [form のデータ更新](#form-%E3%81%AE%E3%83%87%E3%83%BC%E3%82%BF%E6%9B%B4%E6%96%B0)
            -   [form の validate](#form-%E3%81%AE-validate)
        -   [テンプレート駆動フォーム](#%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88%E9%A7%86%E5%8B%95%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A0)
            -   [使用方法](#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95-1)
    -   [起動](#%E8%B5%B7%E5%8B%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.2.

## License

MIT

## Angular の form について

angular には 2 つのフォームスタイルがあり、それぞれ使用方法も思想も違います。
このレポジトリはそれぞれの使い方をまとめています。

### リアクティブフォーム

#### 使用方法

'@angular/forms' の提供する FormBuilder, FormControl, FormGroup を使用します。

-   ① コンポーネントと HTML 要素の form を formGroup で指定し、リンクさせる
-   ② formControlName を指定し、コンポーネントのフォーム属性とリンクさせる

```html
<!-- ① using formGroup to link form with component -->
<form class="form" [formGroup]="loginForm" (ngSubmit)="submit()">
    <!-- ② using formControlName to link form with component's attribute -->
    <input type="email" placeholder="mail" formControlName="mail" required />
    <input
        type="password"
        placeholder="Password"
        formControlName="password"
        required
    />
</form>
```

-   ③-1 フォームで使用する対象の属性を FormBuilder 経由で初期化する

```typescript
// Using FormBuilder to link and initialize form values
    public loginForm = this.builder.group({
        mail: [''],
        password: [''],
    });
```

-   ③-2 フォームで使用する対象の属性を FormGroup, FormControl 経由で初期化する

```typescript
// This also possible though it could be troublesome (using instance..)
    public loginForm = new FormGroup({
        mail: new FormControl(''),
        password: new FormControl(''),
    });
```

#### form のデータ更新

-   FormGroup のメソッド経由で値を更新する

```typescript
// 特定の要素のみ値を更新する際には patchValue を使用する
this.loginForm.patchValue({
    mail: 'sample@example.com',
});

// すべての要素を更新する際には setValue を使用する
this.loginForm.setValue({
    mail: 'sample@example.com',
    password: 'password',
});
```

#### form の validate

-   formGroup で Validators 経由の validate をかける
-   input 要素に required を追加する

```typescript
// Validators 経由で Validate をかける
public loginForm = this.builder.group({
        mail: ['', Validators.email], // validates whether email format or not
        password: ['', Validators.required], // validates form filled or not
    });
```

```html
<!-- html の input要素に require を追加 -->
<input type="email" placeholder="mail" formControlName="mail" required />
<input
    type="password"
    placeholder="Password"
    formControlName="password"
    required
/>
```

### テンプレート駆動フォーム

#### 使用方法

html側、コンポーネント側双方での準備が必須。

-   ① コンポーネントではデータバインドに使用する フォームのモデルを作成する
-   ② ngForm を指定し、コンポーネントとリンクさせる, ngModel で コンポーネントで用意したモデルと関連付ける
-   ③ viewChild を使用してformとしてフォームの入力値を参照、
  
```typescript
  // html 要素の参照
  @ViewChild('form') form: NgForm;
``` 

```html
<!-- ① using ngForm to link form with component -->
        <form class="form" #form="ngForm" (ngSubmit)="submit()">
            <!-- ② using ngModel to link value with component model -->
            <input
                type="email"
                placeholder="mail"
                [(ngModel)]="model.mail"
                name="mail"
                #mail="ngModel"
                required
                email
            />
</form>
```

#### form のデータ更新

-   ngModel で指定したモデル経由で値を更新することができる

```typescript
// model の値を更新
this.model.mail = 'example@example.com';
this.model.password = 'invalid-password';
```

#### form の validate

-   バインドした form 経由で validate をかけたいフォーム要素の errors を確認する
    -   以下で説明する required,email を指定していた場合はその要素の errors を確認することで validateの結果を取得できる
     
-   input 要素に required, email を追加する
    -   required を追加することで必須要素であることをformに伝えることができる
    -   email を追加することで email のパターンマッチングを行ってくれる

```typescript
// 指定していた form要素を参照し、 付与したhtmlのvalidate結果を取得する(required,email)
get emailInvalid() {
    return this.form?.form?.controls?.mail?.errors?.required ? true : false;
}
get emailPatternInvalid() {
    return this.form?.form?.controls?.mail?.errors?.email ? true : false;
}

// password の validate 結果の取得
get passwordInvalid() {
    return this.form?.form?.controls?.password?.errors?.required ? true : false;
}

```

```html
<!-- html の input要素に required,email を追加 -->
<input
    type="email"
    placeholder="mail"
    [(ngModel)]="model.mail"
    name="mail"
    #mail="ngModel"
    required
    email
/>
<input
    type="password"
    placeholder="password"
    [(ngModel)]="model.password"
    name="password"
    #password="ngModel"
    required
/>
```

## 起動

`ng serve` で 起動します.
