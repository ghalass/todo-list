export interface CreateTodoDto {
  task: string;
  description?: string;
  status: boolean;
}

export interface UpdateTodoDto {
  id: number;
  task: string;
  description?: string;
  status: boolean;
}

// // Article
// export interface CreateArticleDto {
//   title: string;
//   description: string;
// }

// export interface UpdateArticleDto {
//   title?: string;
//   description?: string;
// }

// // User
// export interface LoginUserDto {
//   email: string;
//   password: string;
// }

// export interface CreateUserDto {
//   username: string;
//   email: string;
//   password: string;
// }

// export interface UpdateUserDto {
//   username?: string;
//   email?: string;
//   password?: string;
// }

// // Comment
// export interface CreateCommentDto {
//   text: string;
//   articleId: number;
// }

// export interface UpdateCommentDto {
//   text: string;
// }

// // Site
// export interface CreateSiteDto {
//   name: string;
// }
// export interface UpdateSiteDto {
//   name: string;
// }

// // Typeparc
// export interface CreateTypeparcDto {
//   name: string;
// }
// export interface UpdateTypeparcDto {
//   name: string;
// }

// // Parc
// export interface CreateParcDto {
//   name: string;
//   typeparcId: number;
// }
// export interface UpdateParcDto {
//   name?: string;
//   typeparcId?: number;
// }

// // Engin
// export interface CreateEnginDto {
//   name: string;
//   parcId: number;
//   siteId: number;
// }
// export interface UpdateEnginDto {
//   name?: string;
//   active?: boolean;
//   parcId?: number;
//   siteId?: number;
// }

// // Typelubrifiant
// export interface CreateTypelubrifiantDto {
//   name: string;
// }
// export interface UpdateTypelubrifiantDto {
//   name: string;
// }

// // Lubrifiant
// export interface CreateLubrifiantDto {
//   name: string;
//   typelubrifiantId: number;
// }
// export interface UpdateLubrifiantDto {
//   name?: string;
//   typelubrifiantId?: number;
// }

// // Saisielubrifiant
// export interface CreateSaisielubrifiantDto {
//   enginId: number;
//   lubrifiantId: number;
//   du: Date;
//   au: Date;
//   hrm: number;
//   qte: number;
// }

// export interface UpdateSaisielubrifiantDto {
//   enginId?: number;
//   lubrifiantId?: number;
//   du?: Date;
//   au?: Date;
//   hrm?: number;
//   qte?: number;
// }
