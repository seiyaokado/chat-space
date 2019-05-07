# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|emaiil|string|null: false|
|encrypted_password|string|null: false|
|nickname|string|null: false|
|created_at|datetime|null: false|
|updated_at|datetime|null: false|

### Association
- belongs_to :member

## tweetsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|text|string|null: false|
|image|string|null: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|


### Association
- belongs_to :member

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
