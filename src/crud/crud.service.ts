import { Injectable } from '@nestjs/common';
import { User } from './user.dto';
import { DynamoDB } from 'aws-sdk';
import { db, Table } from './db.config.js';
// const Table = 'hari-user'
// const db = new DynamoDB.DocumentClient()
@Injectable()
export class CrudService {
  async getUser(): Promise<any> {
    const params = {
      TableName: Table,
    }
    try {
      const { Items = [] } = await db.scan(params).promise()
      return Items

    } catch (error) {
      console.log(error)
      return error
    }
  }
  async createUser(user: User): Promise<any> {
    const params = {
      TableName: Table,
      Item: user
    }

    try {
      await db.put(params).promise()
      return "User Created Sucessfully"
    } catch (error) {
      console.log(error)
      return error
    }

  }
  async updateUser(id: string, user: User): Promise<any> {
    const params = {
      TableName: Table,
      Key: {
        userId: id
      },
      UpdateExpression:
        'set #emai = :email, #phon = :phone, #nam = :name, #enrol = :enroll,#admis=:admission',
      ExpressionAttributeValues: {
        ":email": user.email, ":phone": user.phone, ":name": user.name, ":enroll": user.enroll, ":admission": user.admission,
      },
      ExpressionAttributeNames: {
        "#emai": "email",
        "#phon": "company",
        "#nam": "name",
        "#admis": "admission",
        "#enrol": "enroll",
      }
    }
    // UpdateExpression = 'SET #ts = :val1',
    //   ExpressionAttributeValues = {
    //     ":val1": new_timestamp
    //   },
    //   ExpressionAttributeNames = {
    //     "#ts": "timestamp"
    //   }
    try {
      console.log(user)
      await db.update(params).promise()
      return "User Updated Sucessfully"
    } catch (error) {
      console.log(error)
      return error
    }


  }
  async deleteUser(id: String): Promise<any> {
    const params = {
      TableName: Table,
      Key: {
        userId: id
      }
    }

    try {
      await db.delete(params).promise()
      return "User Deleted"


    } catch (error) {
      console.log(error)
      return error
    }
  }

  async getSpecficUser(userid: String): Promise<any> {
    const params = {
      TableName: Table,
      Key: {
        userId: userid
      }
    }
    try {
      const Item = await db.get(params).promise()
      return Item
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
