# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|emaiil|string|null: false, unique: true|
|encrypted_password|string|null: false|
|nickname|string|null: false|

### Association
- belongs_to :member
- belongs_to :group

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|text|string||
|groupname|string|null: false|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :member

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|string||
|image|string||
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :member

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|group|references|null: false, foreign_key: true|

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
