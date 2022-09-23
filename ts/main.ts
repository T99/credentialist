/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 3:40 PM -- September 23rd, 2022.
 * Project: credentialist
 * 
 * credentialist - The last time I write a 'fetch credentials from a file'
 *     thingy.
 * Copyright (C) 2022 Trevor Sears
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * NPM main class used for exporting this package's contents.
 *
 * @author Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/)
 * @version v0.1.0
 * @since v0.1.0
 */

export type JSONPrimitive = string | number | boolean | null;
export type JSONMap = { [key: string]: JSONValue };
export type JSONArray = Array<JSONValue>;
export type JSONValue = JSONPrimitive | JSONMap | JSONArray;

// export type TypePrimitive = "string" | "number" | "boolean" | "null";
// export type TypeMap = { [key: string]: TypeValue };
// export type TypeArray = Array<TypeValue>;
// export type TypeValue = TypePrimitive | TypeMap | TypeArray;

export type JSONPrimitiveType<T extends JSONPrimitive> =
	T extends string ?
		"string" :
		T extends number ?
			"number" :
			T extends boolean ?
				"boolean" :
				T extends null ?
					"null" :
					never;
	
export type JSONMapType<T extends JSONMap> =
	{ [JSONMapKey in keyof T]: JSONValueType<T[JSONMapKey]> };


export type JSONArrayType<T extends JSONArray> =
// @ts-ignore I don't honestly know why the next line throw a type error, as
// I've tested the type system and it all appears to work...
	T extends Array<infer U> ? Array<JSONValueType<U>> : never; 

export type JSONValueType<T extends JSONValue> =
	T extends JSONPrimitive ?
		JSONPrimitiveType<T> :
		T extends JSONMap ?
			JSONMapType<T> :
			T extends JSONArray ?
				JSONArrayType<T> :
				never;

export class Credentialist<T extends JSONValue> {
	
	public expectedType: JSONValueType<T>;
	
	public constructor(expectedType: JSONValueType<T>) {
		
		this.expectedType = expectedType;
		
	}
	
}

type MyCredentialFile = {
	host: string,
	connectionLimit: number,
	shouldConnect: boolean,
	db: {
		host: string,
		user: string,
	},
	options: boolean[],
};

let cred: Credentialist<MyCredentialFile> = new Credentialist({
	host: "string",
	connectionLimit: "number",
	shouldConnect: "boolean",
	db: {
		host: "string",
		user: "string",
	},
	options: ["boolean"],
});

console.log(cred);
