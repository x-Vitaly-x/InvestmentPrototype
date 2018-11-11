object @investment => nil
attributes :id, :amount, :mortgage_id
child :mortgage, :object_root => false do
  extends('api/v1/mortgages/show_small')
end
