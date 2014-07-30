﻿using System;
using System.Linq;
using System.Linq.Expressions;

namespace BookArena.Data.Interfaces
{
    public interface IRepository<TEntity>
        where TEntity : class
    {
        IQueryable<TEntity> FindAll();
        IQueryable<TEntity> FindAll(Expression<Func<TEntity, bool>> predicate);
        TEntity Find(Expression<Func<TEntity, bool>> predicate);
        void InsertOrUpdate(TEntity entity);
        void Delete(int id);
        void Save();
    }
}