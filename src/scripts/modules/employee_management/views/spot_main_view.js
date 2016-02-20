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
              project: 'xyz',
              employees: [
                  {
                      id: 1,
                      name: 'Saurabh',
                      designation: 'Full stack',
                      team: 'Tech',
                      seat: 1,
                      table: 1,
                      project: 'xyz'
                  },

                  {
                      id: 2,
                      name: 'Prasad',
                      designation: 'Analyst',
                      team: 'Data',
                      seat: 4,
                      table: 1,
                      project: 'xyz'
                  },

                  {
                      id: 3,
                      name: 'gaurabh',
                      designation: 'designer',
                      team: 'Design',
                      seat: 3,
                      table: 1,
                      project: 'xyz'
                  }
              ]

          },
          {
              table: 2,
              project: 'dfg',
              employees: [
                  {
                      id: 4,
                      name: 'gaurabh',
                      designation: 'Full stack',
                      team: 'Tech',
                      seat: 1,
                      table: 2,
                      project: 'dfg'
                  },

                  {
                      id: 5,
                      name: 'Himel',
                      designation: 'sceince',
                      team: 'Data',
                      seat: 2,
                      table: 2,
                      project: 'dfg'
                  },

                  {
                      id: 6,
                      name: 'Debu',
                      designation: 'designer',
                      team: 'Design',
                      seat: 3,
                      table: 2,
                      project: 'dfg'
                  }
              ]

          },
          {
              table: 2,
              project: 'dfg',
              employees: [
                  {
                      id: 4,
                      name: 'gaurabh',
                      designation: 'Full stack',
                      team: 'Tech',
                      seat: 1,
                      table: 2,
                      project: 'dfg'
                  },

                  {
                      id: 5,
                      name: 'Himel',
                      designation: 'sceince',
                      team: 'Data',
                      seat: 2,
                      table: 2,
                      project: 'dfg'
                  },

                  {
                      id: 6,
                      name: 'Debu',
                      designation: 'designer',
                      team: 'Design',
                      seat: 3,
                      table: 2,
                      project: 'dfg'
                  }
              ]

          },
          {
              table: 2,
              project: 'dfg',
              employees: [
                  {
                      id: 4,
                      name: 'gaurabh',
                      designation: 'Full stack',
                      team: 'Tech',
                      seat: 1,
                      table: 2,
                      project: 'dfg'
                  },

                  {
                      id: 5,
                      name: 'Himel',
                      designation: 'sceince',
                      team: 'Data',
                      seat: 2,
                      table: 2,
                      project: 'dfg'
                  },

                  {
                      id: 6,
                      name: 'Debu',
                      designation: 'designer',
                      team: 'Design',
                      seat: 3,
                      table: 2,
                      project: 'dfg'
                  }
              ]

          },
          {
              table: 2,
              project: 'dfg',
              employees: [
                  {
                      id: 4,
                      name: 'gaurabh',
                      designation: 'Full stack',
                      team: 'Tech',
                      seat: 1,
                      table: 2,
                      project: 'dfg'
                  },

                  {
                      id: 5,
                      name: 'Himel',
                      designation: 'sceince',
                      team: 'Data',
                      seat: 2,
                      table: 2,
                      project: 'dfg'
                  },

                  {
                      id: 6,
                      name: 'Debu',
                      designation: 'designer',
                      team: 'Design',
                      seat: 3,
                      table: 2,
                      project: 'dfg'
                  }
              ]

          },
          {
              table: 2,
              project: 'dfg',
              employees: [
                  {
                      id: 4,
                      name: 'gaurabh',
                      designation: 'Full stack',
                      team: 'Tech',
                      seat: 1,
                      table: 2,
                      project: 'dfg'
                  },

                  {
                      id: 5,
                      name: 'Himel',
                      designation: 'sceince',
                      team: 'Data',
                      seat: 2,
                      table: 2,
                      project: 'dfg'
                  },

                  {
                      id: 6,
                      name: 'Debu',
                      designation: 'designer',
                      team: 'Design',
                      seat: 3,
                      table: 2,
                      project: 'dfg'
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
