define([
    'jquery',
    'underscore',
    'backbone',
    'react',
    'modules/common/views/base',
    'modules/employee_management/collections/sitting_plans',
    'jsx!modules/employee_management/components/spot_main'
  ],

  function($, _, Backbone, React, BaseView, SittingPlans, SpotMain) {
    'use strict';
    var SpotMainView = BaseView.extend({
      el: '#main',
      tagName: 'div',
      className: 'spot_main_view',

      getCollection: function() {
        var sittingCollection = new SittingPlans();
        var data = [
          {
              table: 1,
              project: 'Supply',
              employees: [
                  {
                      id: 1,
                      name: 'Saurabh',
                      designation: 'Full stack',
                      team: 'Tech',
                      seat: 1,
                      table: 1,
                      project: 'Supply'
                  },

                  {
                      id: 2,
                      name: 'Prasad',
                      designation: 'Analyst',
                      team: 'Data',
                      seat: 4,
                      table: 1,
                      project: 'Supply'
                  },

                  {
                      id: 3,
                      name: 'Gaurabh',
                      designation: 'designer',
                      team: 'Design',
                      seat: 3,
                      table: 1,
                      project: 'Supply'
                  }
              ]

          },
          {
              table: 2,
              project: 'User Retention',
              employees: [
                  {
                      id: 4,
                      name: 'Rakesh',
                      designation: 'Full stack',
                      team: 'Tech',
                      seat: 1,
                      table: 2,
                      project: 'User Retention'
                  },

                  {
                      id: 5,
                      name: 'Himel',
                      designation: 'Sceince',
                      team: 'Data',
                      seat: 2,
                      table: 2,
                      project: 'User Retention'
                  },

                  {
                      id: 6,
                      name: 'Debu',
                      designation: 'designer',
                      team: 'Design',
                      seat: 3,
                      table: 2,
                      project: 'User Retention'
                  }
              ]

          },
          {
              table: 3,
              project: 'MIS',
              employees: [
                  {
                      id: 7,
                      name: 'Gaurabh',
                      designation: 'Full stack',
                      team: 'Tech',
                      seat: 1,
                      table: 3,
                      project: 'MIS'
                  },

                  {
                      id: 8,
                      name: 'Himel',
                      designation: 'Sceince',
                      team: 'Data',
                      seat: 2,
                      table: 3,
                      project: 'MIS'
                  },

                  {
                      id: 9,
                      name: 'Shilpa',
                      designation: 'designer',
                      team: 'Design',
                      seat: 3,
                      table: 3,
                      project: 'MIS'
                  }
              ]

          },
          {
              table: 4,
              project: 'Restaurant Onboarding',
              employees: [
                  {
                      id: 10,
                      name: 'Gagan',
                      designation: 'Manager',
                      team: 'Product Manager',
                      seat: 1,
                      table: 4,
                      project: 'Restaurant Onboarding'
                  },

                  {
                      id: 11,
                      name: 'Rahul',
                      designation: 'sceince',
                      team: 'Data',
                      seat: 2,
                      table: 4,
                      project: 'Restaurant Onboarding'
                  },

                  {
                      id: 13,
                      name: 'Hardik',
                      designation: 'designer',
                      team: 'Design',
                      seat: 3,
                      table: 4,
                      project: 'Restaurant Onboarding'
                  }
              ]

          },
          {
              table: 5,
              project: 'Offers',
              employees: [
                  {
                      id: 14,
                      name: 'Ishan',
                      designation: 'Manager',
                      team: 'Product Manager',
                      seat: 1,
                      table: 5,
                      project: 'Offers'
                  },

                  {
                      id: 15,
                      name: 'Krishna',
                      designation: 'sceince',
                      team: 'Data',
                      seat: 2,
                      table: 5,
                      project: 'Offers'
                  },

                  {
                      id: 16,
                      name: 'Goyal',
                      designation: 'designer',
                      team: 'Design',
                      seat: 3,
                      table: 5,
                      project: 'Offers'
                  },

                  {
                      id: 17,
                      name: 'Shikhar',
                      designation: 'Backend Developer',
                      team: 'Tech',
                      seat: 4,
                      table: 5,
                      project: 'Offers'
                  }
              ]

          },
          {
              table: 6,
              project: 'Magical Fridge',
              employees: [
                  {
                      id: 18,
                      name: 'Prithvi',
                      designation: 'Manager',
                      team: 'Product Manager',
                      seat: 1,
                      table: 6,
                      project: 'Magical Fridge'
                  },

                  {
                      id: 19,
                      name: 'Alkesh',
                      designation: 'Backend Engineer',
                      team: 'Tech',
                      seat: 2,
                      table: 6,
                      project: 'Magical Fridge'
                  },

                  {
                      id: 20,
                      name: 'Zunaid',
                      designation: 'Frontend Engineer',
                      team: 'Tech',
                      seat: 3,
                      table: 6,
                      project: 'Magical Fridge'
                  }
              ]

          },
          {
              table: 7,
              project: 'Restaurant App',
              employees: [
                  {
                      id: 21,
                      name: 'Akash',
                      designation: 'Andriod Developer',
                      team: 'Tech',
                      seat: 1,
                      table: 7,
                      project: 'Restaurant App'
                  },
                  {
                      id: 23,
                      name: 'Saurabh Gupta',
                      designation: 'Full Stack',
                      team: 'Tech',
                      seat: 2,
                      table: 7,
                      project: 'Restaurant App'
                  }
              ]

          },
          {
              table: 8,
              project: 'Food Quality',
              employees: [
                  {
                      id: 24,
                      name: 'Manas',
                      designation: 'Manager',
                      team: 'Product Manager',
                      seat: 2,
                      table: 8,
                      project: 'Food Quality'
                  },

                  {
                      id: 25,
                      name: 'Himel',
                      designation: 'sceince',
                      team: 'Data',
                      seat: 3,
                      table: 8,
                      project: 'Food Quality'
                  },

                  {
                      id: 26,
                      name: 'Nandani',
                      designation: 'designer',
                      team: 'Design',
                      seat: 4,
                      table: 8,
                      project: 'Food Quality'
                  }
              ]

          }
        ]

        sittingCollection.reset(data);
        sittingCollection.set_model_collection();
        return sittingCollection;
      },

      component: function() {
        var _mainComponent = React.createFactory(SpotMain);
        return _mainComponent({collection: this.getCollection()});
      }
    });
    return SpotMainView;
  });
