﻿using System;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using BookArena.DAL.Interfaces;
using BookArena.Model.EntityModel;

namespace BookArena.DAL.Repository
{
    public class StudentRepository : IStudentRepository
    {
        private readonly BookArenaDbContext _dbContext;

        public StudentRepository(UnitOfWork uow)
        {
            _dbContext = uow.Context;
        }

        public void InsertOrUpdate(Student entity)
        {
            if (entity.Id == default(int))
            {
                _dbContext.Student.Add(entity);
            }
            else
            {
                _dbContext.Entry(entity).State = EntityState.Modified;
            }
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Student> FindAll(Expression<Func<Student, bool>> predicate)
        {
            return _dbContext.Student.Where(predicate);
        }

        public Student Find(Expression<Func<Student, bool>> predicate)
        {
            return _dbContext.Student.Where(predicate).FirstOrDefault();
        }

        public IQueryable<Student> FindAll()
        {
            return _dbContext.Student;
        }
    }
}